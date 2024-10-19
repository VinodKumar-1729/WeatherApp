# WeatherWeaver - Weather Forecast Application

## Overview

WeatherWeaver is a weather forecast application built using **JavaScript**, **HTML**, and **Tailwind CSS**. It fetches real-time weather data from the [OpenWeatherMap API](https://openweathermap.org/) for any city or current location. The app displays current weather conditions, a 5-day forecast, and additional metrics like temperature, humidity, and wind speed.

## Features

- **Location-based Forecasts:** Get weather data based on your current location using geolocation.
- **City Search:** Search for weather information in any city worldwide.
- **Current Weather:** View details like temperature, humidity, and wind speed.
- **5-Day Forecast:** Displays an extended forecast for the next 5 days with key weather metrics.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views using Tailwind CSS.
- **Recent Searches:** Recently searched cities are stored locally (via localStorage) for quick access.
- **Dynamic Icons:** Displays weather icons that change dynamically based on weather conditions.

## Setup Instructions

### Prerequisites

- A modern web browser (e.g., Google Chrome, Firefox).
- An API key from [OpenWeatherMap](https://openweathermap.org/) (Sign up for free).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/weatherweaver.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd weatherweaver
   ```

3. **Obtain an API key:**  
   Sign up on [OpenWeatherMap](https://openweathermap.org/) and get your API key.

4. **Set up the API key:**

   Open the `app.js` file and replace `'your_api_key'` with the API key you obtained:

   ```javascript
   const API_KEY = "your_api_key";
   ```

5. **Run the application:**

   Open the `index.html` file in your preferred web browser.

## Usage

- **Search for Weather by City Name:**
  - Enter the name of a city in the search bar and click "Search" to get weather information.
- **Use Current Location:**

  - Click the "Use Current Location" button to fetch weather data based on your location (requires browser location access).

- **View Extended Forecasts:**

  - After fetching weather data, the app shows a 5-day weather forecast with detailed weather conditions.

- **Access Recent Searches:**
  - The app stores recently searched cities in `localStorage` so you can quickly search them again without retyping.

## Project Structure

- **`images/`**: Contains images and a gif for the project (if applicable).
- **`index.html`**: The main HTML file that contains the app's layout.
- **`style.css`**: Custom CSS and Tailwind CSS for styling and responsiveness.
- **`app.js`**: Handles the API calls and processes the weather data.

## Dependencies

- **Tailwind CSS:** A utility-first CSS framework for building responsive and modern designs.
- **OpenWeatherMap API:** Provides weather data including temperature, humidity, wind speed, and weather conditions.

## Example API Call

Here's a sample API call to fetch weather data for a specific city:

```javascript
async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  return data;
}
```

## Known Issues

- **API Rate Limits:** The free tier of OpenWeatherMap API has a limited number of requests per minute. If you exceed the limit, the app may display an error or stop fetching new data temporarily.
- **Geolocation Support:** The geolocation feature may not work if the user denies browser access to their location.
- **Cross-browser Compatibility:** Ensure location permissions are enabled in your browser for geolocation to work. Some browsers may behave differently based on permissions and settings.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Open a pull request.

## License

This project is licensed under the MIT License.

```

```
