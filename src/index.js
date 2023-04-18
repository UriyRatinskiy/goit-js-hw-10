import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();
 function getRefs() {
    return {
        searchBox: document.querySelector('#search-box'),
        listCountries: document.querySelector('.country-list'),
        countryInfo: document.querySelector('.country-info'),
    };
}

refs.searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
    const searchingCountry = event.target.value.trim();

    clearPreviousInfo();

    if (searchingCountry === '') {
        return;
    };

    fetchCountries(searchingCountry)
        .then(country => {
            if (country.length > 10) {
                return Notify.info("Too many matches found. Please enter a more specific name.");
            };
            if (country.length <= 10 && country.length >= 2) {
                return createMarkupForCountries(country);
            };
            if (country.length === 1) {
                return createCardForCountry(country);
            };
        })
        .catch(error => {
            return Notify.failure("Oops, there is no country with that name");
        });
};

function createMarkupForCountries(countriesArray) {
    const markup = countriesArray.map(({ flags, name }) => {
        const itemEl = document.createElement('li');
        itemEl.classList.add('country-item');
        const flagEl = document.createElement('img');
        flagEl.classList.add('country-flag');
        flagEl.src = flags.svg;
        flagEl.alt = 'flag';
        flagEl.width = '50';
        const nameEl = document.createElement('h3');
        nameEl.textContent = name.official;

        itemEl.append(flagEl, nameEl);

        return itemEl;
    });
    refs.listCountries.append(...markup);
};

function createCardForCountry(countryArray) {
    const markup = countryArray.map(country => {
        const { flags, name, capital, population, languages } = country;

        const itemEl = document.createElement('div');
        itemEl.classList.add('country-header');
        const flagEl = document.createElement('img');
        flagEl.classList.add('country-flag');
        flagEl.src = flags.svg;
        flagEl.alt = 'flag';
        flagEl.width = '50';
        const nameEl = document.createElement('h1');
        nameEl.textContent = name.official;

        const bForCapital = document.createElement('b');
        bForCapital.textContent = 'Capital: ';
        const capitalEl = document.createElement('p');
        capitalEl.textContent = `${capital}`;
        capitalEl.prepend(bForCapital);

        const bForPopulation = document.createElement('b');
        bForPopulation.textContent = 'Population: ';
        const populationEl = document.createElement('p');
        populationEl.textContent = `${population}`;
        populationEl.prepend(bForPopulation);

        const bForlanguages = document.createElement('b');
        bForlanguages.textContent = 'Languages: ';
        const languagesEl = document.createElement('p');
        languagesEl.textContent = `${(languages.map(language => language.name)).join(', ')}`;
        languagesEl.prepend(bForlanguages);

        itemEl.append(flagEl, nameEl);

        return refs.countryInfo.append(itemEl, capitalEl, populationEl, languagesEl);
    });
    refs.countryInfo.append(markup);
};

function clearPreviousInfo() {
    refs.listCountries.innerHTML = '';
    refs.countryInfo.innerHTML = '';
};