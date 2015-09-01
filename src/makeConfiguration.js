import _ from './utils';

/**
 * @typedef StrictPropTypes~Options
 * @see {@link https://github.com/gajus/react-strict-prop-types#options}
 * @property {Boolean} allowHTMLPropTypes
 * @property {Boolean} allowSVGProps
 */

/**
 * @param {Options} userConfiguration
 * @return {StrictPropTypes~Options}
 */
export default (userConfiguration = {}) => {
    let configuration;

    configuration = {
        allowHTMLProps: false,
        allowSVGProps: false
    };

    _.forEach(userConfiguration, (value, name) => {
        if (typeof configuration[name] === 'undefined') {
            throw new Error(`Unknown configuration property "${name}".`);
        }

        if (typeof value !== 'boolean') {
            throw new Error(`"${name}" property value must be a boolean.`);
        }

        configuration[name] = value;
    });

    return configuration;
};
