const apikey = 'c429430f0bc063b4e6f83a280f68f75e';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: 'cors'});
    const respData = await resp.json();

    console.log(respData);

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = kelvinToFahrenheit(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            ${temp}F
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        </h2>
        <small>${data.weather[0].main}</small>
    `;

    //clean up page
    main.innerHTML = '';

    main.appendChild(weather);
}

function kelvinToFahrenheit(kelvin) {
    return Math.floor(1.8 *(kelvin - 273) + 32 );
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});