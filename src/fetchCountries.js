
export default function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v3.1/name';
    const URL = `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
    return fetch(URL).then(response => {
        if (!response.ok) {
            clearPreviousInfo()
            throw new Error(response.status);
        }
        return response.json()
    });
}

