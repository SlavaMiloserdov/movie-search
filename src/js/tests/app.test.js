const states = require('../app.js');

describe('getRatingMovie', () => {
    it('should return movie rating', () => {
        return states.getRatingMovie("tt1245526").then(imdbRating =>
            expect(imdbRating).toEqual("7.0")
        );
    });
});