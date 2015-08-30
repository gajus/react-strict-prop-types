# react-strict-prop-types

[![Travis build status](http://img.shields.io/travis/gajus/react-strict-prop-types/master.svg?style=flat)](https://travis-ci.org/gajus/react-strict-prop-types)
[![NPM version](http://img.shields.io/npm/v/react-strict-prop-types.svg?style=flat)](https://www.npmjs.org/package/react-strict-prop-types)

A higher order component that raises an error if a component is used with an unknown property. A property is considered unknown when it is not defined in the component `propTypes` declaration.

- [Error](#error)
- [Usage](#usage)
- [Options](#options)
    - [`allowHTMLProps`](#allowhtmlprops)

## Error

The equivalent of the following `console.warn` message is produced when a component is used with an unknown property.

> Using undefined property "foo". Define the missing property in "Test" component propTypes declaration.

## Usage

```js
/**
 * @typedef StrictPropTypes~Options
 * @see {@link https://github.com/gajus/react-strict-prop-types#options}
 * @property {Boolean} allowHTMLProps
 */
```

You can decorate your component using `react-strict-prop-types` as a function, e.g.

```js
import React from 'react';
import StrictPropTypes from 'react-strict-prop-types';

class Test extends React.Component {
    render () {
        return <div />;
    }
}

/**
 * @param {Function} Component
 * @param {StrictPropTypes~Options} options
 * @return {Function}
 */
export default StrictPropTypes(Test);
```

You can decorate your component using the [ES7 decorators](https://github.com/wycats/javascript-decorators) syntax, e.g.

```js
import React from 'react';
import StrictPropTypes from 'react-strict-prop-types';

/**
 * @param {StrictPropTypes~Options} options
 * @return {Function}
 */
@StrictPropTypes()
export default class extends React.Component {
    render () {
        return <div />;
    }
}
```

### Options

Options are supplied as the second parameter to the `StrictPropTypes` function.

```js
StrictPropTypes(Component, options);
```

or as a first parameter to the decorator:

```js
@StrictPropTypes(options);
```

#### `allowHTMLProps`

Default: `false`.

Allows all HTML properties (including `data-*`).
