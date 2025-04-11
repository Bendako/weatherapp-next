"use client";

import { useState } from "react";
import Header from "@/components/Header";
import WeatherCard from "@/components/WeatherCard";
import { WeatherData } from "@/types/weather";
import { getWeatherByCity } from "@/services/weather";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Header onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          {error && (
            <div className="text-red-500 bg-red-50 p-4 rounded-md w-full max-w-[500px]">
              {error}
            </div>
          )}
          <WeatherCard data={weatherData} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
