export default function renderMovieCard(title, posterEl, year, rating, linkMovieGallery) {
    //! if (poster === 'N/A') {
    //     poster = 'http://www.option42.com/wp-content/uploads/2015/03/featured-post-image-nopost.jpg';
    //! }
    // const newSlideTemplate = `${`<div class="swiper-slide">` + `<a href = ${linkMovieGallery} class="swiper-slide__title">`}${
    //     title}</a>` + `<div>` + `<img src = ${poster} class="swiper-slide__poster">` +
    //     `</div>` + `<p class="swiper-slide__year">${year}</p>` +
    //     `<p class="swiper-slide__rating">🏆${rating}</p>` + `</div>`;

    
    // return newSlideTemplate;

    const slideEl = document.createElement('div');
    const slideLinkEl = document.createElement('a');
    const posterDivEl = document.createElement('div');
    // const posterEl = document.createElement('img');
    const slideRatingEl = document.createElement('p');
    const slideMovieYearEl = document.createElement('p');

    slideEl.classList.add('swiper-slide');
    slideLinkEl.classList.add('swiper-slide__title');
    // posterEl.classList.add('swiper-slide__poster');
    slideMovieYearEl.classList.add('swiper-slide__year');
    slideRatingEl.classList.add('swiper-slide__rating');

    slideLinkEl.setAttribute('href', `${linkMovieGallery}`);
    slideLinkEl.textContent = `${title}`;
    // posterEl.setAttribute('src', `${poster}`);
    slideMovieYearEl.textContent = `${year}`;
    slideRatingEl.textContent = `🏆${rating}`;

    posterDivEl.append(posterEl);
    slideEl.append(slideLinkEl, posterDivEl, slideMovieYearEl, slideRatingEl);
    return slideEl;
}