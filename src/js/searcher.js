import { handlerDataMovies } from './app';
import { dataLoading } from './state';
import renderVirtualKeyboard from './virtualKeyboard';
import { updateCurrentPage } from './swiper';

let searchInputText;

export function getCurrentSearchText() {
    return searchInputText;
};

function showErrorMessage(title, error) {
    document.querySelector('.message').classList.remove('d-none');
    if (title) {
        document.querySelector('.message').textContent = `No results for ${title}`;
    }
    if (error) {
        document.querySelector('.message').textContent = error;
    }
}

function showTranslationMessage(title) {
    document.querySelector('.message').classList.remove('d-none');
    document.querySelector('.message').textContent = `Showing results for ${title}`;
}

export async function getArrayOfMoviesData(title, page) {
    const url = `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=c73eb911`;

    try {
        const data = await fetch(url)
            .then(res => res.json())
            .then(response => {                
                if (response.Response === 'False' && response.Error !== 'Movie not found!') {
                    throw new Error(response.Error);
                } else {
                    return response;
                }
            })
            .catch(err => {
                showErrorMessage('', err);
                dataLoading.state = 'Error';
                throw new Error();
            });
        if (data.Error === 'Movie not found!') {
            showErrorMessage(title);
            dataLoading.state = 'Error';
        } else {
            dataLoading.state = 'Loaded';
        }
        return data.Search;

    } catch (error) {        
        return '';
    }
}

export async function getMoviesData(title) {
    const arrayOfMoviesData = await getArrayOfMoviesData(title, 1);
    return arrayOfMoviesData;
}

async function getTranslation(text) {
    const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200510T144540Z.c1aa993ac7c617dd.c884314d2192bd8378cc526d8bb3b65376896783&text=${text}&lang=ru-en`;

    const res = await fetch(urlTranslate);
    const translation = await res.json();

    return translation.text[0];
}

function onChangeInput() {
    searchInputText = document.querySelector('.search-input').value;
}

async function onFormSubmit(event) {
    onChangeInput();
    document.querySelector('.message').classList.add('d-none');
    document.querySelector('.swiper-container').classList.remove('loaded');
    event.preventDefault();        

    if (/[а-я]/i.test(searchInputText)) {
        await getTranslation(searchInputText).then(textTranslation => {
            searchInputText = textTranslation;
        }).catch(err => {
            showErrorMessage('', err);
            dataLoading.state = 'Error';
        });
        showTranslationMessage(searchInputText);
    }

    updateCurrentPage();

    const moviesData = await getMoviesData(searchInputText || '');
    if (dataLoading.state !== 'Error') {
        handlerDataMovies(moviesData);
    } else {
        document.querySelector('.swiper-container').classList.add('loaded');
        document.querySelector('.swiper-container').classList.remove('loaded_hiding');
    }
}

function onResetInput() {
    document.querySelector('.search-input').textContent = '';
}

export function renderSearcher() {
    const formEl = document.createElement('form');
    const inputEl = document.createElement('input');
    const buttonSearchEl = document.createElement('button');
    const buttonResetEl = document.createElement('button');
    const messageEl = document.createElement('p');
    const buttonVirtualKeyboard = document.createElement('button');

    formEl.classList.add('search-form');
    inputEl.classList.add('search-input');
    buttonSearchEl.classList.add('button_search');
    buttonVirtualKeyboard.classList.add('button_virtual-keyboard');
    buttonResetEl.type = 'reset';

    inputEl.setAttribute('placeholder', 'Search');
    inputEl.autofocus = true;
    inputEl.autocomplete = 'off';
    buttonSearchEl.textContent = 'Search';
    buttonResetEl.classList.add('button_clear-input');
    messageEl.classList.add('message');
    messageEl.classList.add('d-none');

    formEl.onsubmit = onFormSubmit;
    buttonVirtualKeyboard.addEventListener('click', function(event) {
        event.preventDefault();
        if (document.querySelector('.keyboard')) {
            document.querySelector('.keyboard').remove();
        } else {            
            renderVirtualKeyboard();
        }
        
    });
    buttonResetEl.addEventListener('click', onResetInput);

    formEl.append(inputEl, buttonResetEl, buttonSearchEl, buttonVirtualKeyboard);
    document.getElementById('main').append(formEl, messageEl);

}



