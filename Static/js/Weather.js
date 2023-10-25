const cityInput = document.querySelector(".input");
const searhButton = document.querySelector(".search-btn");
const weatherCardDiv = document.querySelector('.weather-cards');

const API_KEY = `4354654e3c2fa52b32a5459eee1c2a4f`; // API key for Openweather ApI

const createWeatherCard = (weatherItem) => {
    return`<li class="cards">
               <h2>(${weatherItem.dt_txt.split(" ")[0]})</h2>
               <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
               <h4>Temp: ${(weatherItem.main.temp - 273.15)}°C</h4>
               <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                <h4>Humidity: ${weatherItem.main.humidity} %</h4>
           </li>`
}

const  getweatherDetails =  (cityName, lat, lon) => {
    const weatherAppURL =  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
 
    fetch(weatherAppURL).then(res => res.json()).then(data => {
        console.log('loading...');  
        const uniqueForecastDays = [];
     const fiveDaysforecast = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if(!uniqueForecastDays.includes(forecastDate)) {
            return uniqueForecastDays.push(forecastDate);
        }
        });

        console.log(fiveDaysforecast);
        fiveDaysforecast.forEach(weatherItem => {
            weatherCardDiv.insertAdjacentElement("beforeend",  createWeatherCard(weatherItem));
        });
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast")
    })
}



const getCityCoordinates = () => {
    const cityName = cityInput.value.trim(); // Get user entered city and remove extra space
    if(!cityName) return; // return if city name is empty
    console.log(cityName);

    const GeoCodingApiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch (GeoCodingApiURL).then(res => res.json()).then(data => {
        if(!data.length) return alert(`No coordinates found for ${cityName}`)
        const {nam, lat, lon} = data[0];
        getweatherDetails(nam, lat, lon)
    }).catch(() => {
        alert("An error occurred while fetching the coordinates")
    })
}

searhButton.addEventListener('click', getCityCoordinates) 