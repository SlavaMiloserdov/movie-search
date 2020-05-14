
function closeMoviePost() {
    document.querySelector('.overlay').remove();
    document.querySelector('.movie-post').remove();
}

export default async function renderMoviePost(data) {  
    if (data.Poster === 'N/A') {
        data.Poster = 'http://www.option42.com/wp-content/uploads/2015/03/featured-post-image-nopost.jpg';
    }  
    const moviePost = document.createElement('div');
    const overlay = document.createElement('div');
    const buttonCloseMoviePost = document.createElement('button');

    const moviePostHead = document.createElement('div');
    const moviePostTitle = document.createElement('p');
    const moviePostRating = document.createElement('p');
    const moviePostSubtext = document.createElement('p');

    const moviePostMain = document.createElement('div');
    const moviePostDescription = document.createElement('div');
    const moviePostTrailers = document.createElement('a');
    const moviePostPhotoGallery = document.createElement('a');
    const moviePostPlot = document.createElement('p');
    const moviePostPoster = document.createElement('img');

    const moviePostFooter = document.createElement('div');
    const moviePostActors = document.createElement('p');
    const moviePostWriters = document.createElement('p');
    const moviePostDirector = document.createElement('p');
    const moviePostAwards = document.createElement('p');

    moviePost.classList.add('movie-post', 'active');
    overlay.classList.add('overlay', 'active');
    moviePostHead.classList.add('movie-post__head');
    moviePostFooter.classList.add('movie-post__footer');
    moviePostMain.classList.add('movie-post__main');
    moviePostDescription.classList.add('movie-post__description');
    buttonCloseMoviePost.classList.add('button_close-movie-post');
    moviePostPlot.classList.add('movie-post__plot');
    moviePostPoster.classList.add('movie-post__poster');
    moviePostTrailers.classList.add('movie-post__links');
    moviePostPhotoGallery.classList.add('movie-post__links');

    moviePostTitle.textContent = `Title: ${data.Title} (${data.Year})`;
    moviePostRating.textContent = `🏆 ${data.imdbRating} / 10 (📝${data.imdbVotes})`;
    moviePostSubtext.textContent = `${data.Runtime} | ${data.Genre} | ${data.Released}`;
    moviePostPlot.textContent = `Plot: ${data.Plot}`;
    moviePostPoster.setAttribute('src', data.Poster);
    moviePostActors.textContent = `Actors: ${data.Actors}`;
    moviePostWriters.textContent = `Writers: ${data.Writer}`;
    moviePostDirector.textContent = `Director: ${data.Director}`;
    moviePostAwards.textContent = `Awards: ${data.Awards}`;
    moviePostTrailers.href = `https://www.imdb.com/title/${data.imdbID}/videogallery/content_type-trailer/`;
    moviePostTrailers.textContent = `🎬 Trailers`;
    moviePostPhotoGallery.href = `https://www.imdb.com/title/${data.imdbID}/mediaindex`;
    moviePostPhotoGallery.textContent = `📸 Photo Gallery`;
    buttonCloseMoviePost.textContent = 'Close';

    buttonCloseMoviePost.addEventListener('click', closeMoviePost);

    moviePostDescription.append(moviePostTrailers, moviePostPhotoGallery, moviePostPlot);
    moviePostFooter.append(moviePostDirector, moviePostActors, moviePostWriters, moviePostAwards);
    moviePostMain.append(moviePostPoster, moviePostDescription);
    moviePostHead.append(moviePostTitle, moviePostSubtext, moviePostRating);
    moviePost.append(buttonCloseMoviePost, moviePostHead, moviePostMain, moviePostFooter);
    document.body.append(moviePost, overlay);
} 