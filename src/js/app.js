import { renderSearcher, getMoviesData } from './searcher';
import { renderSwiper, addSlides } from './swiper';
import renderMovieCard from './movieCard';
import { MOVIES_DATA, updateData, dataLoading } from './state';

const TIMEOUT_FOR_GETTING_RATING = 500;

function renderHeader() {
  const headerEl = document.createElement('header');
  const headerTitleEl = document.createElement('p');

  headerEl.classList.add('header');
  headerTitleEl.classList.add('header__title');
  headerEl.setAttribute('id', 'header');

  headerTitleEl.textContent = 'Movie search';

  headerEl.append(headerTitleEl);
  document.body.append(headerEl);
}

function renderFooter() {
  const footerEl = document.createElement('footer');
  const footerDescriptionEl = document.createElement('p');
  const footerGitHubInfoEl = document.createElement('div');
  const footerGitHubIconEl = document.createElement('img');
  const footerGitHubAccountEl = document.createElement('a');

  footerEl.classList.add('footer');
  footerDescriptionEl.classList.add('footer__description');
  footerGitHubAccountEl.classList.add('footer__description');
  footerGitHubIconEl.classList.add('github-info__icon');
  footerGitHubInfoEl.classList.add('github-info');
  footerGitHubAccountEl.classList.add('github-info__acc');
  footerEl.setAttribute('id', 'footer');

  footerDescriptionEl.textContent = 'RS School 2020q1';
  footerGitHubAccountEl.textContent = 'slavamiloserdov';
  footerGitHubAccountEl.setAttribute('href', 'https://github.com/SlavaMiloserdov');
  footerGitHubIconEl.setAttribute('src', './img/github.png');

  footerGitHubInfoEl.append(footerGitHubIconEl, footerGitHubAccountEl);
  footerEl.append(footerDescriptionEl, footerGitHubInfoEl);
  document.body.append(footerEl);
}

function renderPreloader() {
  const preloaderTemplate = `<div class="preloader">
    <svg class="preloader__image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="currentColor"
        d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 
        21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49
        48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48
        48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49
        0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48
        48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51
        0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922
        60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
      </path>
    </svg>
  </div>`;
  document.querySelector('.swiper-container').insertAdjacentHTML('afterbegin', preloaderTemplate);
}

function renderMainContainer() {
  const mainContainerEl = document.createElement('main');

  mainContainerEl.classList.add('main');
  mainContainerEl.setAttribute('id', 'main');

  document.body.append(mainContainerEl);
}

async function getRatingMovie(imdbID) {
  const urlRating = `https://www.omdbapi.com/?i=${imdbID}&apikey=c73eb911`;
  const rating = await fetch(urlRating).then(res => res.json()).then(data => data.imdbRating);
  return rating;
}

async function getMoviePosters(data) {
  const arrayOfPosters = [];
  // for (let i = 0; i < data.length; i += 1) {
  //   const posterEl = document.createElement('img');
  //   posterEl.classList.add('swiper-slide__poster');
  //   posterEl.setAttribute('src', `${data[i].Poster}`);
  //   arrayOfPosters.push(posterEl);
  // }
  data.forEach(movieData => {
    const posterEl = document.createElement('img');
    posterEl.classList.add('swiper-slide__poster');
    posterEl.setAttribute('src', `${movieData.Poster}`);
    arrayOfPosters.push(posterEl);
  });

  return arrayOfPosters;
}

export async function renderMovieCards(data) {
  const arrayOfPostersEl = await getMoviePosters(data);
  const arrayOfSlidesEl = [];

  for (let i = 0; i < data.length; i += 1) {
    const slideEl = renderMovieCard(data[i].Title, arrayOfPostersEl[i], data[i].Year, data[i].Rating, data[i].VideoGallery);
    arrayOfSlidesEl.push(slideEl);
  }

  addSlides(arrayOfSlidesEl);
}

export async function handlerDataMovies(moviesData) {
  for (let i = 0; i < moviesData.length; i += 1) {
    const rating = await getRatingMovie(moviesData[i].imdbID);
    moviesData[i].Rating = +rating;
    moviesData[i].VideoGallery = `https://www.imdb.com/title/${moviesData[i].imdbID}/videogallery/`;
  }

  updateData(moviesData);

  setTimeout(() => {
    renderMovieCards(MOVIES_DATA);
    document.querySelector('.swiper-container').classList.add('loaded');
    document.querySelector('.swiper-container').classList.remove('loaded_hiding');
  }, TIMEOUT_FOR_GETTING_RATING);
}

async function renderStartMovieCards() {
  const moviesData = await getMoviesData('red');
  if (dataLoading.state !== 'Error') {
    handlerDataMovies(moviesData);
  }
}

renderHeader();
renderMainContainer();
renderSearcher();
renderSwiper();
renderStartMovieCards();
renderPreloader();
renderFooter();

console.log('Виртуальная клавиатура появляется в самом низу, и на разрешениях > 1200px !\n' +
  'Дополнительный функционал: при нажатии на слайд, отображается карточка ' +
  'с подробной информацией о фильме, ссылками на трейлеры к фильму и фотогалерею.\n' +
  'Со временем присобачу сам трейлер в неё, но пока так.');
