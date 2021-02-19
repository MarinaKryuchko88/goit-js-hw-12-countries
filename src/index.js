// import refs from './js/refs';
import countriesTpl from './templates/countries.hbs';
import countryInformation from './templates/countryInformation.hbs';
import debounce from 'lodash.debounce';
import './js/notifications';

const inputEl = document.querySelector('.input');
const countriesListEl = document.querySelector('.js-countries');

inputEl.addEventListener(
  'input',
  debounce(event => {
    event.preventDefault();
    // console.log(event.target.value); // одно и
    // console.log(inputEl.value);  // то же

    inputEl.textContent = inputEl.value;
    const countryName = inputEl.textContent;
    // console.log(countryName);

    const url = `https://restcountries.eu/rest/v2/name/${countryName}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length === 1) {
          oneCountryMarkup(data);
        }
        if (data.length >= 2 && data.length <= 10) {
          countriesMarkup(data); // потому что data у нас - это уже массив объектов.
        }
        if (data.length > 10) {
          alert('Too many matches found. Please enter a more specific query');
        }
        inputEl.value = '';
        console.log(data.length);
      })
      .catch(error => console.log(error));

    countriesListEl.innerHTML = '';
  }, 500),
);

function countriesMarkup(name) {
  const markup = countriesTpl(name);
  countriesListEl.insertAdjacentHTML('beforeend', markup);
}
function oneCountryMarkup(name) {
  const markup = countryInformation(name);
  countriesListEl.insertAdjacentHTML('beforeend', markup);
}
