import { expect, test as t, window } from 't-t';
import jsdom from 'jsdom';
import c, { __keyCounter } from '../src/index';

const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><body><div id="app"><p>Hello world!</p></div></body>`, {
    url: 'https://c.c/',
});
window('window', dom.window);
window('document', dom.window.document);

const test = t;
// const only = t;
// const test = () => {};

test('should initialize a component', () => {
    expect(
        c(() => {
            const p = document.createElement('p');
            p.classList.add('test');
            p.textContent = 'test';
            return p;
        })().outerHTML
    ).toBe('<p class="test">test</p>');
});

test('should run the execute method once if the array is empty', () => {
    let onlyOnce = 0;
    const component = c(({ execute }) => {
        execute(() => onlyOnce++, []);
    });
    component();
    component();
    component();
    component();
    expect(onlyOnce).toBe(1);
});

test('should run the execute method each time the array changes', () => {
    let variable = 0;
    const component = c(({ execute, props: { count } }) => {
        execute(() => variable++, [count]);
    });
    component({ count: 1 });
    component({ count: 2 });
    component({ count: 3 });
    expect(variable).toBe(3);
});

test('should run all the execute methods', () => {
    let count = 0;
    c(({ execute }) => {
        execute(() => count++, []);
        execute(() => count++, [count < 2]);
        execute(() => count++, [count > 2]);
    })();
    expect(count).toBe(3);
});

test('should be available to access the pros from the execute method', () => {
    let variable = 0;
    const component = c(({ execute, props: { count } }) => {
        execute(() => (variable = count), [count]);
    });
    component({ count: 1 });
    expect(variable).toBe(1);
});

test('should get the injected props', () => {
    let variable = 0;
    const component = c(({ props: { count } }) => {
        variable = count;
    });
    component({ count: 3 });
    expect(variable).toBe(3);
});

test('should generate a key', () => {
    let variable = 0;
    __keyCounter.value = 0;
    c(({ key }) => {
        variable = key;
    })();
    expect(variable).toBe('__0__');
});

test('should concat the added key with the generated a key', () => {
    let variable = 0;
    __keyCounter.value = 0;
    const component = c(({ key }) => {
        variable = key;
    });
    component({ key: 'key' });
    expect(variable).toBe('key__0__');
});

test('should generate multiple keys for multiple instance of the component', () => {
    let count = 0;
    let keys = [];
    __keyCounter.value = 0;
    const component = c(({ key }) => {
        keys[count++] = key;
    });
    component();
    component({ key: 'test-1' });
    component({ key: 'test-2' });
    expect(JSON.stringify(keys)).toBe('["__0__","test-1__0__","test-2__0__"]');
});

test('should concatenate the multiple generated keys for multiple instance of the component', () => {
    let count = 0;
    let keys = [];
    __keyCounter.value = 0;
    const component = c(({ key }) => {
        keys[count++] = key;
    });
    component({ key: 'key1' });
    component({ key: 'key2' });
    component({ key: 'key3' });
    expect(JSON.stringify(keys)).toBe('["key1__0__","key2__0__","key3__0__"]');
});

test('should run the cleanup method when the main element is removed', () => {
    let variable;
    let count = 0;
    const p = document.createElement('p');
    p.textContent = 'test';
    const component = c(({ execute, cleanup }) => {
        execute(() => {
            count < 1 && process.nextTick(() => count++);
        }, [count]);
        cleanup((el) => {
            variable = el;
        });
        return !count ? p : '';
    });
    expect(component().outerHTML).toBe('<p>test</p>');
    process.nextTick(() => {
        expect(component()).toBe('');
        expect(variable.outerHTML).toBe('<p>test</p>');
    });
});

test('should not run the cleanup method when the main element is changed', () => {
    let variable;
    const p = document.createElement('p');
    const pEmpty = document.createElement('p');
    p.textContent = 'test';
    const component = c(({ cleanup, execute, update }) => {
        const [count, setCount] = update(0);
        execute(() => {
            process.nextTick(() => setCount(1));
        }, [count()]);
        cleanup((el) => {
            variable = el;
        });
        return !count() ? p : pEmpty;
    });
    component();
    expect(component().outerHTML).toBe('<p>test</p>');
    process.nextTick(() => {
        expect(component().outerHTML).toBe('<p></p>');
        expect(variable).toBe(undefined);
    });
});

test('should define a initial state', () => {
    let variable;
    const component = c(({ update }) => {
        const [count] = update(0);
        variable = count;
    });
    component();
    expect(variable()).toBe(0);
});

test('should replace the element', () => {
    let variable;
    const component = c(({ execute, update }) => {
        const [count, setCount] = update(0);
        execute(() => {
            process.nextTick(() => setCount(1));
        }, [count()]);
        variable = count;
    });
    component();
    expect(variable()).toBe(0);
    process.nextTick(() => expect(variable()).toBe(1));
});

test('should replace the element when none is an empty string', () => {
    let variable;
    const component = c(({ execute, update }) => {
        const [count, setCount] = update(0);
        execute(() => {
            process.nextTick(() => setCount(1));
        }, [count()]);
        variable = !count() ? 1 : 0;
    });
    component();
    expect(variable).toBe(1);
    process.nextTick(() => {
        expect(variable).toBe(0);
    });
});

test('should remove the element when the new one is an empty string', () => {
    let count = 0;
    const p = document.createElement('p');
    p.textContent = 'test';
    const component = c(({ execute }) => {
        execute(() => {
            count < 1 &&
                process.nextTick(() => {
                    count++;
                });
        }, [count]);
        return !count ? p : '';
    });
    component();
    expect(component().outerHTML).toBe('<p>test</p>');
    process.nextTick(() => {
        expect(component()).toBe('');
    });
});
