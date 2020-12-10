export default function renderMovieCard(title, posterEl, year, rating, linkMovieGallery) {    
    const slideEl = document.createElement('div');
    const slideLinkEl = document.createElement('a');
    const posterDivEl = document.createElement('div');
    const slideRatingEl = document.createElement('p');
    const slideMovieYearEl = document.createElement('p');

    slideEl.classList.add('swiper-slide');
    slideLinkEl.classList.add('swiper-slide__title');
    slideMovieYearEl.classList.add('swiper-slide__year');
    slideRatingEl.classList.add('swiper-slide__rating');

    slideLinkEl.setAttribute('href', `${linkMovieGallery}`);
    slideLinkEl.textContent = `${title}`;
    slideMovieYearEl.textContent = `${year}`;

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(rating)) {
        slideRatingEl.textContent = '🏆-/-';
    } else {
        slideRatingEl.textContent = `🏆${rating}`;
    }    

    posterDivEl.append(posterEl);
    slideEl.append(slideLinkEl, posterDivEl, slideMovieYearEl, slideRatingEl);
    
    return slideEl;
}