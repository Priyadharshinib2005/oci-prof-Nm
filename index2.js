const apiKey = "YOUR_OPENWEATHER_API_KEY";  // Replace with your OpenWeather API key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const errorMessage = document.getElementById("errorMessage");
const weatherDetails = document.getElementById("weatherDetails");
const cityName = document.getElementById("cityName");
const weatherDesc = document.getElementById("weatherDesc");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        displayError("Please enter a city name.");
    }
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            displayWeatherData(data);
        } else {
            displayError("City not found. Please try again.");
        }
    } catch (error) {
        displayError("An error occurred while fetching the weather data.");
    }
}

function displayWeatherData(data) {
    errorMessage.textContent = "";
    weatherDetails.style.display = "block";
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherDesc.textContent = data.weather[0].description;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
}

function displayError(message) {
    errorMessage.textContent = message;
    weatherDetails.style.display = "none";
}
