import Swiper from 'swiper';
import { getArrayOfMoviesData, getCurrentSearchText } from './searcher';
import { handlerDataMovies } from './app';
import { dataLoading, MOVIES_DATA } from './state';
import renderMoviePost from './moviePost';

let swiper;
let currentPage = 1;
let touchStartPosition;

export function updateCurrentPage() {
    currentPage = 1;
}

async function loadNextPage() {
    if (getCurrentSearchText()) {
        document.querySelector('.message').classList.add('d-none');
        document.querySelector('.swiper-container').classList.remove('loaded');
        currentPage += 1;
        const moviesData = await getArrayOfMoviesData(getCurrentSearchText(), currentPage);

        if (dataLoading.state !== 'Error') {
            handlerDataMovies(moviesData);
        } else {
            document.querySelector('.swiper-container').classList.add('loaded');
            document.querySelector('.swiper-container').classList.remove('loaded_hiding');
        }
    }
}

export function initializeSwiper() {
    swiper = new Swiper('.swiper-container', {
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            1020: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        },
        speed: 600,
        followFinger: false,
        longSwipes: false,
        shortSwipes: false,
        freeModeSticky: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    swiper.on('touchStart', function (event) {
        touchStartPosition = event.clientX;
    });
    swiper.on('touchEnd', function (event) {
        if (event.clientX < touchStartPosition) {
            swiper.slideNext();
        }
        if (event.clientX > touchStartPosition) {
            swiper.slidePrev();
        }
    });
}

export function clearSwiper() {
    swiper.removeAllSlides();
}

async function onSlideHandler(event) {
    if (!event.target.classList.contains('swiper-slide__title')) {
        const currentSlide = MOVIES_DATA[swiper.clickedIndex];
        const titleOfCurrentMovie = currentSlide.Title;
        const yearOfCurrentMovie = currentSlide.Year;
        
        const url = `https://www.omdbapi.com/?t=${titleOfCurrentMovie}&y=${yearOfCurrentMovie}&plot=full&apikey=c73eb911`;
    
        const res = await fetch(url);
        const data = await res.json();   
    
        renderMoviePost(data);
    }    
}

export function addSlides(slides) {
    swiper.off('reachEnd');
    clearSwiper();
    slides.forEach(slide => {
        swiper.appendSlide(slide);
    });
    swiper.on('reachEnd', loadNextPage);
    Array.from(document.querySelectorAll('.swiper-slide')).forEach(slide => {
        slide.addEventListener('click', onSlideHandler);
    });
}

export function renderSwiper() {
    const swiperContainerEl = document.createElement('div');
    const swiperWrapperEl = document.createElement('div');
    const swiperPaginationEl = document.createElement('div');
    const swiperButtonPrevEl = document.createElement('div');
    const swiperButtonNextEl = document.createElement('div');

    swiperContainerEl.classList.add('swiper-container');
    swiperWrapperEl.classList.add('swiper-wrapper');
    swiperPaginationEl.classList.add('swiper-pagination');
    swiperButtonPrevEl.classList.add('swiper-button-prev');
    swiperButtonNextEl.classList.add('swiper-button-next');

    swiperContainerEl.append(swiperWrapperEl, swiperPaginationEl);
    document.getElementById('main').append(swiperContainerEl, swiperButtonPrevEl, swiperButtonNextEl);
    initializeSwiper();
}