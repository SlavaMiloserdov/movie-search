const states = require('../searcher.js');


describe('getTranslation', () => {
    it('should return translation', () => {
        return states.getTranslation('париж').then(translate =>
            expect(translate).toEqual('Paris')
        );
    });
});