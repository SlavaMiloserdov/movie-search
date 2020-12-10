const states = require('../moviePost.js');

describe('getMoviePostHeadEl', () => {
    it('should return html div element', () => {
        // Defined/Undefined
        expect(states.getMoviePostHeadEl(
            {
            Title: "RED",
            Year: "2010",
            Rated: "PG-13",
            Released: "15 Oct 2010",
            Runtime: "111 min",
            Actors: "Bruce Willis, Mary-Louise Parker, Heidi von Palleske, Jefferson Brown",
            Awards: "Nominated for 1 Golden Globe. Another 4 wins & 18 nominations.",
            BoxOffice: "$88,900,000",
            Country: "USA, China",
            DVD: "25 Jan 2011",
            Director: "Robert Schwentke",
            Genre: "Action, Comedy, Crime, Thriller",
            Language: "English, Russian",
            Metascore: "60",
            Plot: "Frank (Bruce Willis) is retired, bored, and lonely living off his government pension in a nondescript suburb in an equally nondescript house. The only joy in Frank's life is his calls to the government pension processing center when he gets to talk to his case worker, Sarah (Mary-Louis Parker). Sarah is as bored and lonely as Frank and marks her conversations with the unknown Frank and her spy novels as the only things fun in her life. When something in Frank's past forces Frank back into his old line of work and puts an unwitting Sarah in the middle of the intrigue, Frank and Sarah begin a journey into Frank's past and the people he used to work with. Like Frank they are all RED ... Retired Extremely Dangerous.",
            Poster: "https://m.media-amazon.com/images/M/MV5BMzg2Mjg1OTk0NF5BMl5BanBnXkFtZTcwMjQ4MTA3Mw@@._V1_SX300.jpg",
            Production: "Summit Entertainment",
            Ratings: (3)[{}],
            Response: "True",
            Type: "movie",
            Website: "N/A",
            Writer: "Jon Hoeber (screenplay), Erich Hoeber (screenplay), Warren Ellis (graphic novel), Cully Hamner (graphic novel)",
            imdbID: "tt1245526",
            imdbRating: "7.0",
            imdbVotes: "280,530"
        })).toBeDefined();
        
        // Div element
        const element = states.getMoviePostHeadEl(
            {
            Title: "RED",
            Year: "2010",
            Rated: "PG-13",
            Released: "15 Oct 2010",
            Runtime: "111 min",
            Actors: "Bruce Willis, Mary-Louise Parker, Heidi von Palleske, Jefferson Brown",
            Awards: "Nominated for 1 Golden Globe. Another 4 wins & 18 nominations.",
            BoxOffice: "$88,900,000",
            Country: "USA, China",
            DVD: "25 Jan 2011",
            Director: "Robert Schwentke",
            Genre: "Action, Comedy, Crime, Thriller",
            Language: "English, Russian",
            Metascore: "60",
            Plot: "Frank (Bruce Willis) is retired, bored, and lonely living off his government pension in a nondescript suburb in an equally nondescript house. The only joy in Frank's life is his calls to the government pension processing center when he gets to talk to his case worker, Sarah (Mary-Louis Parker). Sarah is as bored and lonely as Frank and marks her conversations with the unknown Frank and her spy novels as the only things fun in her life. When something in Frank's past forces Frank back into his old line of work and puts an unwitting Sarah in the middle of the intrigue, Frank and Sarah begin a journey into Frank's past and the people he used to work with. Like Frank they are all RED ... Retired Extremely Dangerous.",
            Poster: "https://m.media-amazon.com/images/M/MV5BMzg2Mjg1OTk0NF5BMl5BanBnXkFtZTcwMjQ4MTA3Mw@@._V1_SX300.jpg",
            Production: "Summit Entertainment",
            Ratings: (3)[{}],
            Response: "True",
            Type: "movie",
            Website: "N/A",
            Writer: "Jon Hoeber (screenplay), Erich Hoeber (screenplay), Warren Ellis (graphic novel), Cully Hamner (graphic novel)",
            imdbID: "tt1245526",
            imdbRating: "7.0",
            imdbVotes: "280,530"
        });
        expect(`${element}`).toEqual('[object HTMLDivElement]')
    });
    
});