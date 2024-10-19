const API_KEY = 'd03b2932d90c9142130b6bc792a8c751'; // OpenWeatherMap API key
const weatherInfoDiv = document.getElementById('weather-info');
const locationNameEl = document.getElementById('location-name');
const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const weatherIconEl = document.getElementById('weather-icon');
const weatherDescriptionEl = document.getElementById('weather-description');
const recentSearchesEl = document.getElementById('recent-searches');
const extendedForecastDiv = document.getElementById('extended-forecast');
const errorMessageEl = document.getElementById('error-message'); // Div element for Error message 
const loadingMessageEl = document.getElementById('loading-message'); // Div element for Loading message

// Code for displaying error message
function displayError(message) {
    errorMessageEl.textContent = message;
    errorMessageEl.classList.remove('hidden');
    setTimeout(() => {
        errorMessageEl.classList.add('hidden');
    }, 5000); // Send error message after 5 seconds
}

// Display loading message
function displayLoadingMessage(show) {
    if (show) {
        loadingMessageEl.classList.remove('hidden');
    } else {
        loadingMessageEl.classList.add('hidden');
    }
}

// Code to Fetch weather data from API
async function fetchWeatherData(city) {
    displayLoadingMessage(true); // Show loading message
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        return await response.json();
    } catch (error) {
        displayError('Failed to fetch weather data. Please check the city name or try again later.');
        throw error;
    } finally {
        displayLoadingMessage(false); // Hide loading message
    }
}

// Code to Fetch weather data using coordinates (for current location)
async function fetchWeatherDataByCoords(lat, lon) {
    displayLoadingMessage(true); // Show loading message
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        return await response.json();
    } catch (error) {
        displayError('Failed to fetch weather data. Please try again later.');
        throw error;
    } finally {
        displayLoadingMessage(false); // Hide loading message
    }
}

// Code to Fetch 5-day weather forecast data from API
async function fetchForecastData(city) {
    displayLoadingMessage(true); // Show loading message
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        return await response.json();
    } catch (error) {
        displayError('Failed to fetch forecast data. Please check the city name or try again later.');
        throw error;
    } finally {
        displayLoadingMessage(false); // Hide loading message
    }
}

// Fetch 5-day forecast using coordinates
async function fetchForecastDataByCoords(lat, lon) {
    displayLoadingMessage(true); // Show loading message
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        return await response.json();
    } catch (error) {
        displayError('Failed to fetch forecast data. Please try again later.');
        throw error;
    } finally {
        displayLoadingMessage(false); // Hide loading message
    }
}

// Display weather data
function displayWeatherData(data) {
    locationNameEl.textContent = data.name;
    temperatureEl.textContent = Math.round(data.main.temp) + '°C';
    humidityEl.textContent = data.main.humidity + '%';
    windSpeedEl.textContent = Math.round(data.wind.speed) + ' km/h';
    weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIconEl.alt = data.weather[0].description; // Set alt attribute for accessibility
    weatherDescriptionEl.textContent = data.weather[0].description; // Show weather description below the icon
    weatherInfoDiv.classList.remove('hidden');
}

// Display 5-day forecast data
function displayForecastData(forecastData) {
    extendedForecastDiv.innerHTML = ''; // Clear previous forecast data
    const forecasts = forecastData.list.filter((forecast, index) => index % 8 === 0); // Get forecast every 24 hours

    forecasts.forEach((forecast) => {
        const date = new Date(forecast.dt_txt).toLocaleDateString();
        const temp = Math.round(forecast.main.temp) + '°C';
        const humidity = forecast.main.humidity + '%';
        const windSpeed = Math.round(forecast.wind.speed) + ' km/h';
        const weatherIcon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        const description = forecast.weather[0].description;

        // Code for creating card 
        const forecastCard = `
            <div class="text-white first-color shadow-md rounded-lg p-4 text-center">
                <h3 class="text-lg font-bold text-blue-500">${date}</h3>
                <img src="${weatherIcon}" alt="${description}" class="w-12 h-12 mx-auto my-2">
                <p class="text-sm text-pink-500">${description}</p> <!-- Add description under the icon -->
                <p class="text-lg text-blue-400">${temp}</p>
                <p class="text-sm">Humidity: ${humidity}</p>
                <p class="text-sm">Wind: ${windSpeed}</p>
            </div>
        `;
        extendedForecastDiv.insertAdjacentHTML('beforeend', forecastCard);
    });
}

// Code to Search for weather data by city name
document.getElementById('search-button').addEventListener('click', async () => {
    const cityInput = document.getElementById('city-input').value.trim();
    if (cityInput) {
        try {
            const weatherData = await fetchWeatherData(cityInput);
            const forecastData = await fetchForecastData(cityInput);
            displayWeatherData(weatherData);
            displayForecastData(forecastData);
            updateRecentSearches(cityInput);
            document.getElementById('city-input').value = ''; // Clear input
        } catch (error) {
            // The Errors are already handled in fetchWeatherData and fetchForecastData
        }
    } else {
        displayError('Please enter a valid city name.');
    }
});

// Code to Use current location to get weather
document.getElementById('current-location-button').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            try {
                const weatherData = await fetchWeatherDataByCoords(lat, lon);
                const forecastData = await fetchForecastDataByCoords(lat, lon);
                displayWeatherData(weatherData);
                displayForecastData(forecastData);
            } catch (error) {
                displayError('Failed to fetch weather data for your location.');
            }
        }, (error) => {
            if (error.code === error.PERMISSION_DENIED) {
                displayError('Location access denied by user. Please allow location access.');
            } else {
                displayError('Unable to retrieve your location. Please try again.');
            }
        });
    } else {
        displayError('This browser does not support Geolocation.');
    }
});

// Handle recently searched cities
function updateRecentSearches(city) {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    if (!recentSearches.includes(city)) {
        recentSearches.unshift(city); // Add new search at the beginning
        if (recentSearches.length > 5) {
            recentSearches.pop(); // Keep only the last 5 searches
        }
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        loadRecentSearches();
    }
}

function loadRecentSearches() {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    if (recentSearches.length > 0) {
        recentSearchesEl.innerHTML = recentSearches.map(city => `<option>${city}</option>`).join('');
        recentSearchesEl.classList.remove('hidden');
    } else {
        recentSearchesEl.classList.add('hidden');
    }
}

recentSearchesEl.addEventListener('change', async () => {
    const selectedCity = recentSearchesEl.value;
    try {
        const weatherData = await fetchWeatherData(selectedCity);
        const forecastData = await fetchForecastData(selectedCity);
        displayWeatherData(weatherData);
        displayForecastData(forecastData);
    } catch (error) {
        // The Errors are already handled in fetchWeatherData and fetchForecastData
    }
});

// Load recent searches on page load
window.addEventListener('DOMContentLoaded', loadRecentSearches);
