import { icons } from '../Section';

function mapWeatherIcon(weatherId: number) {
  if (weatherId >= 200 && weatherId <= 232) {
    return icons.thunderstorm;
  } else if (weatherId >= 300 && weatherId <= 321) {
    return icons.heavyRain;
  } else if (weatherId >= 500 && weatherId <= 531) {
    return icons.lightRain;
  } else if (weatherId >= 600 && weatherId <= 622) {
    return icons.snow;
  } else if (weatherId === 800) {
    return icons.clear;
  } else if (weatherId >= 801 && weatherId <= 804) {
    return icons.cloud;
  }
  return icons.clear;
}
interface Weather {
  clouds: number;
  deg: number;
  dt: number;
  humidity: number;
  pressure: number;
  speed: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  weather: Array<{
    id: number;
    main: string;
    icon: string;
    description: string;
  }>;
}

interface WeatherResponse {
  city: {
    id: number;
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    population: number;
  };
  cnt: number;
  cod: string;
  message: number;
  list: Array<Weather>
}

export default async function getWeatherDetails() {
  // Hit the weather API
  const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?lat=30.29365&lon=120.16142&units=metric&cnt=1&appid=d94bcd435b62a031771c35633f9f310a';
  const response = await fetch(weatherApiUrl);
  const weatherResult: WeatherResponse = await response.json();

  // Update the tempature
  const weatherTemperature = weatherResult.list[0].temp;
  return {
    temperature: weatherTemperature,    
    icon: mapWeatherIcon(weatherResult.list[0].weather[0].id),
    rainy: weatherResult.list[0].weather.some(({ id }) => {
      const icon = mapWeatherIcon(id);
      return icon === icons.lightRain || icon === icons.heavyRain;
    }),
  };
}
