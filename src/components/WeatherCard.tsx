import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WeatherCard() {
  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        <CardTitle>Weather Information</CardTitle>
        <CardDescription>Select a city to see the weather details</CardDescription>
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