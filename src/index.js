import p from 'p';
import { isNodejs } from './is-nodejs.js';
import { queue } from './queue-microtask.js';

// Exposed for testing proposes
export const __keyCounter = { value: 1 };

const hasParent = new Set();
const contains = new Map();
const elements = new Map();
const hooks = new Map();
const componentHooksKeys = new Map();
const componentCleanup = new Map();

export function c(render) {
    return factory.bind(null, `__${__keyCounter.value++}__`);

    function factory(k, nextProps = {}) {
        let element;
        let cleanup;
        const noop = () => {};
        const key = nextProps && nextProps.key ? nextProps.key + k : k;
        const hooksKeys = new Set();

        function update(currentHook, initialState) {
            const setState = (newState) => {
                hooks.set(currentHook, newState);
                let newElement = renderComponent();
                if (!isNodejs && element) {
                    newElement = p(element, newElement);
                }
                element = newElement;
            };
            if (!hooks.has(currentHook)) {
                hooks.set(currentHook, initialState);
            }
            return [() => hooks.get(currentHook), setState];
        }

        function execute(currentHook, callback, newDeps) {
            const hasNoDeps = !newDeps;
            const deps = hooks.get(currentHook);
            const hasChangedDeps = deps
                ? !newDeps.every((item, i) => JSON.stringify(item) === JSON.stringify(deps[i]))
                : true;
            if (hasNoDeps || hasChangedDeps) {
                hooks.set(currentHook, newDeps);
                callback(newDeps);
            }
        }

        return (element = renderComponent());

        function renderComponent() {
            let currentHook = 0;
            let ref = {};
            const newElement = render({
                cleanup: (callback) => (cleanup = callback || cleanup),
                execute: (callback, deps) => {
                    const hook = `execute${key}${currentHook++}`;
                    hooksKeys.add(hook);
                    return execute(hook, callback, deps);
                },
                key,
                props: nextProps,
                ref: (fn) => (ref.fn = fn),
                update: (initialState) => {
                    const hook = `update${key}${currentHook++}`;
                    hooksKeys.add(hook);
                    return update(hook, initialState);
                },
            });

            const prevElement = elements.get(key);
            ref.fn && ref.fn(newElement, prevElement);

            if (!isNodejs && newElement) {
                newElement.__key__ = newElement.__key__ || key;
                elements.forEach(function (el, k) {
                    const current = contains.get(k) || [];
                    if (
                        el &&
                        !(elements.get(k) && !elements.get(k).parentNode) &&
                        newElement.contains(el) &&
                        !current.includes(key) &&
                        k !== key
                    ) {
                        contains.set(key, [...new Set([...(contains.get(key) || []), k])]);
                        hasParent.add(k);
                    }
                });
                elements.set(key, newElement);
                componentHooksKeys.set(key, hooksKeys);
                componentCleanup.set(key, cleanup || noop);
            } else if (elements.get(key) && !newElement) {
                queue(() => cleanup && onCleanup());
            }

            return newElement;
        }

        function onCleanup() {
            const ct = contains.get(key);
            const arr = elements.get(key) ? [...(ct || [key])] : [];
            if (!hasParent.has(key)) arr.push(key);
            const length = arr.length;
            for (let i = 0; i < length; i++) {
                const k = arr[i];
                if (elements.has(k)) {
                    const cl = componentCleanup.get(k);
                    cl && cl(elements.get(k));
                    elements.set(k, 0);
                    if (!hasParent.has(k) || [...(ct || [])].includes(k)) {
                        componentHooksKeys.get(k).forEach((h) => hooks.delete(h));
                        componentHooksKeys.delete(k);
                        elements.delete(k);
                    }
                    hasParent.delete(k);
                    contains.delete(k);
                    componentCleanup.delete(k);
                }
            }
            cleanup = null;
            element = null;
        }
    }
}

export default c;
