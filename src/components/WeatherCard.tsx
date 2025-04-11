import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WeatherData } from "@/types/weather";
import Image from "next/image";

interface WeatherCardProps {
  data?: WeatherData;
  isLoading?: boolean;
}

export default function WeatherCard({ data, isLoading = false }: WeatherCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle className="animate-pulse bg-gray-200 h-6 w-48 rounded"></CardTitle>
          <CardDescription className="animate-pulse bg-gray-200 h-4 w-72 rounded"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center p-4">
              <div className="animate-pulse bg-gray-200 h-16 w-32 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="animate-pulse bg-gray-200 h-4 w-24 rounded"></span>
                  <span className="animate-pulse bg-gray-200 h-6 w-16 rounded"></span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>Weather Information</CardTitle>
          <CardDescription>Search for a city to see the weather details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center p-4">
              <div className="text-6xl font-bold">--°C</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Humidity</span>
                <span className="text-lg font-medium">--%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Wind Speed</span>
                <span className="text-lg font-medium">-- km/h</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Feels Like</span>
                <span className="text-lg font-medium">--°C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Pressure</span>
                <span className="text-lg font-medium">-- hPa</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {data.name}
          <Image
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            width={40}
            height={40}
          />
        </CardTitle>
        <CardDescription className="capitalize">{data.weather[0].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center p-4">
            <div className="text-6xl font-bold">{Math.round(data.main.temp)}°C</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Humidity</span>
              <span className="text-lg font-medium">{data.main.humidity}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Wind Speed</span>
              <span className="text-lg font-medium">{Math.round(data.wind.speed)} km/h</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Feels Like</span>
              <span className="text-lg font-medium">{Math.round(data.main.feels_like)}°C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Pressure</span>
              <span className="text-lg font-medium">{data.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 