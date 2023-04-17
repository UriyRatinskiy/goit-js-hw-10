import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const BASE_URL = "https://restcountries.com/v3.1/all";
const URL = `${BASE_URL}?fields=name,capital,population,flags,languages`;

fetch(URL)
.then((response) => response.json())
.then((data) => {
    // console.log("data", data)
    insertContent(data.articles);
})
.catch((error) => { 
    // console.log("error", error);
});

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