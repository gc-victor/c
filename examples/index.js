import c from './src/index.js';
import t from './t.js';

const Paragraph = ({ count }) => t`<p>Count: ${count}</p>`;

const SamePropsComponent = c(({ execute }) => {
    execute(() => {
        console.log('SameComponent');
    }, []);

    return t`<p>Same Component</p>`;
});

const FormComponent = c(({ props: { add, decrement, increment }, update }) => {
    const [count, setCount] = update(0);

    const innerAdd = (ev) => {
        setCount(Number(ev.target.value));
        add(ev);
    };
    const innerDecrement = () => {
        setCount(count() - 1);
        //decrement();
    };
    const innerIncrement = () => {
        setCount(count() + 1);
        // increment();
    };

    return t`
        <p>
            <button onclick="${innerIncrement}">+</button>
            <input oninput="${innerAdd}" name="input" type="number" value="${count()}" />
            ${t`<button onclick="${innerDecrement}">-</button>`}
        </p>
    `;
});

const CountComponent = c(({ key, cleanup, execute, props: { count }, update }) => {
    const [x, setX] = update(0);

    execute(() => {
        console.log('Count', { key, count });
        console.log({ x: x() });
        setX(x() + 1);
    }, [count]);

    cleanup(() => console.log('cleanup Count'));

    return Paragraph({ count });
});

const CounterComponent = c(({ key, cleanup, execute, update }) => {
    const [count, setCount] = update(0);

    const increment = () => {
        setCount(count() + 1);
    };
    const decrement = () => {
        setCount(count() - 1);
    };
    const add = (ev) => {
        setCount(Number(ev.target.value));
    };

    execute(() => {
        console.log('EXECUTED ONCE');
        setCount(2);
    }, []);

    execute(() => {
        console.log('EXECUTED EACH TIME THE VARIABLE CHANGES', count());
    }, [count()]);

    cleanup(() => console.log('cleanup Counter'));

    console.log('Counter', { key });

    return count() < 7
        ? t`
            <div id="app-${key}">
                <h1>Counter - ${key}</h1>
                ${CountComponent({ key, count: count() })}
                ${SamePropsComponent({ key })}
                ${FormComponent({ key, add, decrement, increment })}
            </div>
        `
        : '';
});

const counterOne = document.getElementById('counter-1');
counterOne.parentNode.replaceChild(CounterComponent({ key: '1' }), counterOne);

// const counterTwo = document.getElementById('counter-2');
// counterTwo.parentNode.replaceChild(CounterComponent({ key: '2' }), counterTwo);
