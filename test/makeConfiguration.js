import {
    expect
} from 'chai';

import makeConfiguration from './../dist/makeConfiguration';

describe('makeConfiguration', () => {
    describe('when using default configuration', () => {
        let configuration;

        beforeEach(() => {
            configuration = makeConfiguration();
        });
        describe('allowHTMLProps property', () => {
            it('defaults to false', () => {
                expect(configuration.allowHTMLProps).to.equal(false);
            });
        });
    });
    describe('when unknown property is provided', () => {
        it('throws an error', () => {
            expect(() => {
                makeConfiguration({
                    unknownProperty: true
                });
            }).to.throw(Error, 'Unknown configuration property "unknownProperty".');
        });
    });
    it('does not mutate user configuration', () => {
        let userConfiguration;

        userConfiguration = {};

        makeConfiguration(userConfiguration);

        expect(userConfiguration).to.deep.equal({});
    });
});
