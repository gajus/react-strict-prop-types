/* eslint-disable no-console */

import _ from './utils';
import HTMLPropNames from './HTMLPropNames';
import SVGPropNames from './SVGPropNames';
import makeConfiguration from './makeConfiguration';

/**
 * @param {Function} Component
 * @param {Object} userConfiguration
 * @return {Function}
 */
export default (Component, userConfiguration) => {
    let configuration;

    configuration = makeConfiguration(userConfiguration);

    return class extends Component {
        validateProps (nextProps) {
            _.forEach(nextProps, (value, name) => {
                if (!Component.propTypes[name]) {
                    if (configuration.allowHTMLProps) {
                        if (HTMLPropNames.indexOf(name) !== -1 || name.indexOf('data-') === 0 || name.indexOf('aria-') === 0) {
                            return;
                        }
                    }

                    if (configuration.allowSVGProps) {
                        if (SVGPropNames.indexOf(name) !== -1) {
                            return;
                        }
                    }

                    console.warn(`Using undefined property "${name}". Define the missing property in "${Component.displayName}" component propTypes declaration.`);
                }
            });
        }

        componentWillMount () {
            this.validateProps(this.props);

            if (super.componentWillMount) {
                super.componentWillMount();
            }
        }

        componentWillReceiveProps (nextProps) {
            this.validateProps(nextProps);

            if (super.componentWillReceiveProps) {
                super.componentWillReceiveProps(nextProps);
            }
        }
    };
};
