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
        Foo,
        spy;

    beforeEach(() => {
        spy = sinon.stub(console, `warn`);

        global.document = jsdom.jsdom(`
            <!DOCTYPE html>
            <html>
            <head>
            </head>
            <body>
            </body>
            </html>
        `);

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
            static displayName = 'Foo';

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
    });

    afterEach(() => {
        console.warn.restore();
    });

    context('when React.Component is called with undefined property', () => {
        it('throws an error', () => {
            TestUtils.renderIntoDocument(<Foo unknownProperty='' />);

            expect(spy.calledWithExactly(`Using undefined property "unknownProperty". Define the missing property in "Foo" component propTypes declaration.`)).to.equal(true);
        });
    });
    context('when options.disable', () => {
        context('is true', () => {
            it('returns the original object', () => {
                let baz0,
                    baz1;

                baz0 = {};

                baz1 = strictPropTypes(baz0, {
                    disable: true
                });

                expect(baz1).to.equal(baz0);
            });
        });
    });
    context('when options.allowHTMLProps', () => {
        context('is false', () => {
            context('when React.Component is called with an undefined DOM property', () => {
                it('throws an error', () => {
                    TestUtils.renderIntoDocument(<Foo className='' />);

                    expect(spy.calledWithExactly(`Using undefined property "className". Define the missing property in "Foo" component propTypes declaration.`)).to.equal(true);
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
        });
    });
});
