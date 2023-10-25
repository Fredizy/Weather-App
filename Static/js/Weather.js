const cityInput = document.querySelector(".input");
const searhButton = document.querySelector(".search-btn");

const API_KEY = `4354654e3c2fa52b32a5459eee1c2a4f`; // API key for Openweather ApI

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim(); // Get user entered city and remove extra space
    if(!cityName) return; // return if city name is empty
    console.log(cityName);

    const GeoCodingApiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch (GeoCodingApiURL).then(res => res.json()).then(data => {
        console.log(data);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates")
    })
}

searhButton.addEventListener('click', getCityCoordinates)