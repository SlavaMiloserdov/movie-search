import { POSTER_URL, IMDB_URL } from './constants';

const movieTrailer = require( 'movie-trailer' );

function closeMoviePost() {
    document.querySelector('.overlay').remove();
    document.querySelector('.movie-post').remove();
}

export function getMoviePostHeadEl(data) {
    const moviePostHeadEl = document.createElement('div');
    const moviePostTitleEl = document.createElement('p');
    const moviePostRatingEl = document.createElement('p');
    const moviePostSubtextEl = document.createElement('p');

    moviePostHeadEl.classList.add('movie-post__head');

    moviePostTitleEl.textContent = `Title: ${data.Title} (${data.Year})`;
    moviePostRatingEl.textContent = `🏆 ${data.imdbRating} / 10 (📝${data.imdbVotes})`;
    moviePostSubtextEl.textContent = `${data.Runtime} | ${data.Genre} | ${data.Released}`;

    moviePostHeadEl.append(moviePostTitleEl, moviePostSubtextEl, moviePostRatingEl);

    return moviePostHeadEl;
}

export async function getMoviePostMainEl(data) {
    let linkMovieTrailer;
    const moviePostMainEl = document.createElement('div');
    const moviePostPosterEl = document.createElement('img');
    const moviePostTrailerEl = document.createElement('iframe');

    await movieTrailer( data.Title, data.Year )
    .then( response => {
        linkMovieTrailer = response.substr(32);
    }).catch(err => {
        console.log(err);        
        moviePostTrailerEl.classList.add('d-none');       
    });  

    let poster = data.Poster;
    if (poster === 'N/A') {
        poster = POSTER_URL;
    }  
    

    moviePostPosterEl.classList.add('movie-post__poster');
    moviePostTrailerEl.classList.add('movie-post__trailer');
    moviePostMainEl.classList.add('movie-post__main');

    moviePostPosterEl.setAttribute('src', poster);
    moviePostTrailerEl.setAttribute('src', `https://www.youtube.com/embed/${linkMovieTrailer}`);
    moviePostTrailerEl.setAttribute('frameborder', '0');
    moviePostTrailerEl.setAttribute('allowfullscreen', 'true');
    moviePostTrailerEl.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    
    moviePostMainEl.append(moviePostPosterEl, moviePostTrailerEl);

    return moviePostMainEl;
}

export function getMoviePostFooterEl(data) {
    const moviePostFooterEl = document.createElement('div');
    const moviePostDescriptionEl = document.createElement('div');
    const moviePostTrailersEl = document.createElement('a');
    const moviePostPhotoGalleryEl = document.createElement('a');
    const moviePostPlotEl = document.createElement('p');
    const moviePostActorsEl = document.createElement('p');
    const moviePostWritersEl = document.createElement('p');
    const moviePostDirectorEl = document.createElement('p');
    const moviePostAwardsEl = document.createElement('p');

    moviePostFooterEl.classList.add('movie-post__footer');
    moviePostDescriptionEl.classList.add('movie-post__description');
    moviePostPlotEl.classList.add('movie-post__plot');
    moviePostTrailersEl.classList.add('movie-post__links');
    moviePostPhotoGalleryEl.classList.add('movie-post__links');

    moviePostPlotEl.textContent = `Plot: ${data.Plot.slice(0,700)}..`;
    moviePostActorsEl.textContent = `Actors: ${data.Actors}`;
    moviePostWritersEl.textContent = `Writers: ${data.Writer}`;
    moviePostDirectorEl.textContent = `Director: ${data.Director}`;
    moviePostAwardsEl.textContent = `Awards: ${data.Awards}`;
    moviePostTrailersEl.href = `${IMDB_URL.imdb}/title/${data.imdbID}/videogallery/content_type-trailer/`;
    moviePostTrailersEl.textContent = `🎬 Trailers`;
    moviePostPhotoGalleryEl.href = `${IMDB_URL.imdb}/title/${data.imdbID}/mediaindex`;
    moviePostPhotoGalleryEl.textContent = `📸 Photo Gallery`;

    moviePostDescriptionEl.append(moviePostTrailersEl, moviePostPhotoGalleryEl, moviePostPlotEl);
    moviePostFooterEl.append(moviePostDescriptionEl, moviePostDirectorEl, moviePostActorsEl, moviePostWritersEl, moviePostAwardsEl);

    return moviePostFooterEl;
}

export default async function renderMoviePost(data) {        
    const moviePostEl = document.createElement('div');
    const overlayEl = document.createElement('div');
    const buttonCloseMoviePostEl = document.createElement('button');

    const moviePostHeadEl = getMoviePostHeadEl(data);
    const moviePostMainEl = await getMoviePostMainEl(data);
    const moviePostFooterEl = getMoviePostFooterEl(data);

    moviePostEl.classList.add('movie-post', 'active');
    overlayEl.classList.add('overlay', 'active');
    buttonCloseMoviePostEl.classList.add('button_close-movie-post');

    buttonCloseMoviePostEl.textContent = 'Close';
    
    buttonCloseMoviePostEl.addEventListener('click', closeMoviePost);
    
    moviePostEl.append(buttonCloseMoviePostEl, moviePostHeadEl, moviePostMainEl, moviePostFooterEl);
    document.body.append(moviePostEl, overlayEl);
} 