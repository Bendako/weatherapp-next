import { CitySuggestion, WeatherData } from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL;

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const error = await response.json();
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      throw new Error(error.message || 'Failed to fetch weather data by city');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data by city');
  }
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch weather data by coordinates');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data by coordinates');
  }
}

export async function searchCities(query: string, limit: number = 5): Promise<CitySuggestion[]> {
  if (!query || query.length < 3) { // Don't search for very short strings
    return [];
  }
  try {
    // Use the correct Geo API endpoint directly
    const geocodingApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`;
    const response = await fetch(geocodingApiUrl);

    if (!response.ok) {
      // Don't throw an error, just return empty array if suggestions fail
      console.error("Geocoding API error:", await response.text());
      return [];
    }

    const data: CitySuggestion[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch city suggestions:", error);
    return []; // Return empty on network or other errors
  }
} 