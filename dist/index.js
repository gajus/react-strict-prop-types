'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _strictPropTypes = require('./strictPropTypes');

var _strictPropTypes2 = _interopRequireDefault(_strictPropTypes);

var decoratorConstructor = undefined,
    functionConstructor = undefined;

/**
 * When used as a function.
 *
 * @param {Function} Component
 * @param {Object} options
 * @return {Function}
 */
functionConstructor = function (Component, options) {
    return (0, _strictPropTypes2['default'])(Component, options);
};

/**
 * When used as a ES7 decorator.
 *
 * @param {Object} options
 * @return {Function}
 */
decoratorConstructor = function (options) {
    return function (Component) {
        return functionConstructor(Component, options);
    };
};

exports['default'] = function () {
    if (typeof arguments[0] === 'function') {
        return functionConstructor(arguments[0], arguments[1]);
    } else {
        return decoratorConstructor(arguments[0]);
    }
};

module.exports = exports['default'];