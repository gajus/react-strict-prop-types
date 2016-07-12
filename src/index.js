import strictPropTypes from './strictPropTypes';

let decoratorConstructor,
    functionConstructor;

/**
 * When used as a function.
 *
 * @param {Function} Component
 * @param {Object} options
 * @return {Function}
 */
functionConstructor = (Component, options) => {
    return strictPropTypes(Component, options);
};

/**
 * When used as a ES7 decorator.
 *
 * @param {Object} options
 * @return {Function}
 */
decoratorConstructor = (options) => {
    return (Component) => {
        return functionConstructor(Component, options);
    };
};

export default (...args) => {
    if (typeof args[0] === 'function') {
        return functionConstructor(args[0], args[1]);
    } else {
        return decoratorConstructor(args[0]);
    }
};
