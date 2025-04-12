export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

export interface WeatherError {
  message: string;
}

export type WeatherResponse = {
  data?: WeatherData;
  error?: WeatherError;
  isLoading: boolean;
}

export interface CitySuggestion {
  name: string;
  local_names?: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state?: string;
} 