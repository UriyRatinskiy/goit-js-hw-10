export default  function fetchCountries(name){
const BASE_URL = "https://restcountries.com/v3.1/all";
const URL = `${BASE_URL}?fields=name.official,capital,population,flags,languages`;

return fetch(URL)
.then((response) => response.json())
.then((data) => {
    // console.log("data", data)
    insertContent(data.articles);
})
.catch((error) => { 
    console.log("error", error);
});
};