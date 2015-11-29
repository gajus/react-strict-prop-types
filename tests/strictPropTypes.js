/* eslint-disable max-nested-callbacks, react/no-multi-comp */

import {
    expect
} from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import sinon from 'sinon';
import strictPropTypes from './../src/strictPropTypes';

describe('strictPropTypes', () => {
    let Bar,
        Baz,
        Foo,
        Qux,
        spy;

    beforeEach(() => {
        spy = sinon.stub(console, 'warn');

        global.document = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');

        global.window = document.defaultView;

        Foo = class extends React.Component {
            static displayName = 'Foo';

            static propTypes = {
                bar: React.PropTypes.string
            };

            render () {
                return <div />;
            }
        };

        Foo = strictPropTypes(Foo, {
            allowHTMLProps: false
        });

        Bar = class extends React.Component {
            static displayName = 'Bar';

            static propTypes = {
                bar: React.PropTypes.string
            };

            render () {
                return <div />;
            }
        };

        Bar = strictPropTypes(Bar, {
            allowHTMLProps: true
        });

        Baz = class extends React.Component {
            static displayName = 'Baz';

            static propTypes = {
                bar: React.PropTypes.string
            };

            render () {
                return <div />;
            }
        };

        Baz = strictPropTypes(Baz, {
            allowSVGProps: false
        });

        Qux = class extends React.Component {
            static displayName = 'Qux';

            static propTypes = {
                bar: React.PropTypes.string
            };

            render () {
                return <div />;
            }
        };

        Qux = strictPropTypes(Qux, {
            allowSVGProps: true
        });
    });

    afterEach(() => {
        /* eslint-disable no-console */
        console.warn.restore();
        /* eslint-enable no-console */
    });

    context('when React.Component is called with undefined property', () => {
        it('throws an error', () => {
            TestUtils.renderIntoDocument(<Foo unknownProperty='' />);

            expect(spy.calledWithExactly('Using undefined property "unknownProperty". Define the missing property in "Foo" component propTypes declaration.')).to.equal(true);
        });
    });
    context('when options.allowHTMLProps', () => {
        context('is false', () => {
            context('when React.Component is called with an undefined DOM property', () => {
                it('throws an error', () => {
                    TestUtils.renderIntoDocument(<Foo className='' />);

                    expect(spy.calledWithExactly('Using undefined property "className". Define the missing property in "Foo" component propTypes declaration.')).to.equal(true);
                });
            });
        });
        context('is true', () => {
            context('when React.Component is called with an undefined DOM property', () => {
                it('does not throw an error', () => {
                    TestUtils.renderIntoDocument(<Bar className='' />);

                    expect(spy.called).to.equal(false);
                });
            });
            context('when React.Component is called with data-* DOM property', () => {
                it('does not throw an error', () => {
                    TestUtils.renderIntoDocument(<Bar data-test='' />);

                    expect(spy.called).to.equal(false);
                });
            });
            context('when React.Component is called with aria-* DOM property', () => {
                it('does not throw an error', () => {
                    TestUtils.renderIntoDocument(<Bar aria-test='' />);

                    expect(spy.called).to.equal(false);
                });
            });
        });
    });
    context('when options.allowSVGProps', () => {
        context('is false', () => {
            context('when React.Component is called with an undefined SVG property', () => {
                it('throws an error', () => {
                    TestUtils.renderIntoDocument(<Baz clipPath='' />);

                    expect(spy.calledWithExactly('Using undefined property "clipPath". Define the missing property in "Baz" component propTypes declaration.')).to.equal(true);
                });
            });
        });
        context('is true', () => {
            context('when React.Component is called with an undefined SVG property', () => {
                it('does not throw an error', () => {
                    TestUtils.renderIntoDocument(<Qux clipPath='' />);

                    expect(spy.called).to.equal(false);
                });
            });
        });
    });
});
