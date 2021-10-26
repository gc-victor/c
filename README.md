# C

C is a micro-library (<2 KB) to create reactive components and patch DOM Trees.

## Key Features

- Micro-library <2 KB
- Reactive Components
- Patch DOM Trees
- No compilation needed
- Small API, not much to learn

## Let's Play

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script type="module">
            import c from 'https://cdn.jsdelivr.net/gh/gc-victor/c/dist/esm/index.js';
            // Use any template engine of your choice that creates DOM trees
            import t from 'https://cdn.jsdelivr.net/gh/gc-victor/t/dist/esm/index.js';

            const app = document.getElementById('app');
            const App = c(({ update }) => {
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
                
                return t`
                    <div id="app">
                        <h1>Counter - ${count()}</h1>
                        <button onclick="${increment}">+</button>
                        <input oninput="${add}" name="input" type="number" value="${count()}" />
                        <button onclick="${decrement}">-</button>
                    </div>
                `;
            });

            app.parentNode.replaceChild(App(), app);
        </script>
    </head>
    <body>
        <div id="app">
            <h1>Counter - 0</h1>
            <button>+</button><input name="input" type="number" value="0"><button>-</button>
        </div>
    </body>
</html>
```

## Install

You can use pnpm, npm or yarn to install it.

```console
npm install git+https://github.com/gc-victor/c.git#main
```

Import it in your framework.

```js
import c from 'c';
```

Or import it in a `<script>` as a module.

```html
<script type="module">
    import c from 'https://cdn.jsdelivr.net/gh/gc-victor/c/dist/esm/index.js';
</script>
```

## How to use it

The injected hooks allow reactive updates and side effects.

```javascript
const App = c(({ cleanup, execute, props, update }) => {
    const [state, setState] = update('');

    execute(() => {
        console.log('EXECUTED ONCE');
    }, []);
    execute(() => {
        console.log('EXECUTED EACH TIME THE VARIABLE CHANGES');
    }, [variable]);
    cleanup(() => {
        console.log('cleanup');
    });

    return t`<h1>C</h1>`;
});
```

-   **cleanup**: is triggered when the component element is deleted from the DOM
-   **execute**: is the main way to trigger side effects, you can use more than once in a single component
-   **props**: are the properties used to send data from one component to another
-   **update**: manages the component states, you can use more than once in a single component. It returns an array, where the first item is a function with the current state, and the second is the setter

## Acknowledgments

### Inspiration

-   [React](https://reactjs.org/)
-   [HyperApp](https://github.com/jorgebucaran/hyperapp)
-   [h-h](https://github.com/gc-victor/h-h)
-   [p](https://github.com/gc-victor/p)

### Tools

-   [esbuild](https://esbuild.github.io/)
-   [gzip-size](https://esbuild.github.io/)
-   [d-d](https://github.com/gc-victor/d-d)
-   [esm](https://github.com/standard-things/esm)
-   [es-module-shims](https://github.com/guybedford/es-module-shims)
-   [jsdom](https://github.com/jsdom/jsdom)
-   [t-t](https://github.com/gc-victor/t-t)
-   [chokidar-cli](https://github.com/kimmobrunfeldt/chokidar-cli)

## Compatible Versioning

### Summary

Given a version number MAJOR.MINOR, increment the:

- MAJOR version when you make backwards-incompatible updates of any kind
- MINOR version when you make 100% backwards-compatible updates

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR format.

[![ComVer](https://img.shields.io/badge/ComVer-compliant-brightgreen.svg)](https://github.com/staltz/comver)

## Contribute

First off, thanks for taking the time to contribute!
Now, take a moment to be sure your contributions make sense to everyone else.

### Reporting Issues

Found a problem? Want a new feature? First of all, see if your issue or idea has [already been reported](../../issues).
If it hasn't, just open a [new clear and descriptive issue](../../issues/new).

### Commit message conventions

A specification for adding human and machine readable meaning to commit messages.

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Submitting pull requests

Pull requests are the greatest contributions, so be sure they are focused in scope and do avoid unrelated commits.

-   Fork it!
-   Clone your fork: `git clone http://github.com/<your-username>/c`
-   Navigate to the newly cloned directory: `cd t`
-   Create a new branch for the new feature: `git checkout -b my-new-feature`
-   Install the tools necessary for development: `npm install`
-   Make your changes.
-   `npm run build` to verify your change doesn't increase output size.
-   `npm test` to make sure your change doesn't break anything.
-   Commit your changes: `git commit -am 'Add some feature'`
-   Push to the branch: `git push origin my-new-feature`
-   Submit a pull request with full remarks documenting your changes.

## License

[MIT License](https://github.com/gc-victor/c/blob/master/LICENSE)

Copyright (c) 2021 Víctor García

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
