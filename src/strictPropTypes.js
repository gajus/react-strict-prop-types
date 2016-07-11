/* eslint-disable no-console */

import _ from 'lodash';
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
                        if (_.indexOf(HTMLPropNames, name) !== -1 || _.indexOf(name, 'data-') === 0 || _.indexOf(name, 'aria-') === 0) {
                            return;
                        }
                    }

                    if (configuration.allowSVGProps) {
                        if (_.indexOf(SVGPropNames, name) !== -1) {
                            return;
                        }
                    }

                    console.warn('Using undefined property "' + name + '". Define the missing property in "' + Component.displayName + '" component propTypes declaration.');
                }
            });
        }

        componentWillMount () {
            this.validateProps(this.props);

            if (super.componentWillMount) {
                super.componentWillMount();
            }
        }

        componentWillReceiveProps (nextProps, nextContext) {
            this.validateProps(nextProps);

            if (super.componentWillReceiveProps) {
                super.componentWillReceiveProps(nextProps, nextContext);
            }
        }
    };
};
