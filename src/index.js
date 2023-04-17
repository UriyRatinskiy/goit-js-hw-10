import './css/styles.css';

const DEBOUNCE_DELAY = 300;

fetch(`https://restcountries.com/v3.1/all`).then((response) => response.json());