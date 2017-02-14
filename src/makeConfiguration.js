/**
 * @typedef StrictPropTypes~Options
 * @see {@link https://github.com/gajus/react-strict-prop-types#options}
 * @property {boolean} allowHTMLPropTypes
 * @property {boolean} allowSVGProps
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

    for (name in userConfiguration){
        if (!userConfiguration.hasOwnProperty(name)){
            continue;
        }
        let value = userConfiguration[name];
        if (typeof configuration[name] === 'undefined') {
            throw new Error('Unknown configuration property "' + name + '".');
        }

        if (!_.isBoolean(value)) {
            throw new Error('"' + name + '" property value must be a boolean.');
        }

        configuration[name] = value;
    };

    return configuration;
};
