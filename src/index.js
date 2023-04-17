import './css/styles.css';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const listItem = (item) => `<li>
<img src="${item.flags.svg}" alt="${item.flags.alt}">
<h2>${item.name.official}</h2>
<p>capital: ${item.capital}</p>
<p>population: ${item.population}</p>
<p>languages: ${item.languages}</p>
</li>`;
// console.log(listItem);
const generateContent = (array) => array.reduce((acc, item) => acc + listItem(item), "");
// console.log(generateContent);
const insertContent = (array) => {
    const result = generateContent(array);
    countryInfo.insertAdjacentHTML("beforeend", result);
};