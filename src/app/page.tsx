"use client";

import { useState } from "react";
import Header from "@/components/Header";
import WeatherCard from "@/components/WeatherCard";
import { WeatherData } from "@/types/weather";
import { getWeatherByCity, getWeatherByCoords } from "@/services/weather";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | undefined>();
  const [locationError, setLocationError] = useState<string | undefined>();

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setSearchError(undefined);
    setLocationError(undefined); // Clear location error on new search
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    setLocationError(undefined);
    setSearchError(undefined); // Clear search error

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await getWeatherByCoords(latitude, longitude);
          setWeatherData(data);
        } catch (err) {
          setLocationError(err instanceof Error ? err.message : 'Failed to fetch weather for your location');
          setWeatherData(undefined);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('The request to get user location timed out.');
            break;
          default:
            setLocationError('An unknown error occurred while getting location.');
            break;
        }
        setWeatherData(undefined);
        setIsLoading(false);
      }
    );
  };

  return (
    <main>
      <Header onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <Button onClick={handleGetLocation} disabled={isLoading}>
            <MapPin className="mr-2 h-4 w-4" />
            {isLoading ? 'Getting Location...' : 'Use My Location'}
          </Button>
          {searchError && (
            <div className="text-red-500 bg-red-50 p-4 rounded-md w-full max-w-[500px]">
              {searchError}
            </div>
          )}
          {locationError && (
            <div className="text-red-500 bg-red-50 p-4 rounded-md w-full max-w-[500px]">
              {locationError}
            </div>
          )}
          <WeatherCard data={weatherData} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
