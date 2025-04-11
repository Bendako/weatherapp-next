import Header from "@/components/Header";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <WeatherCard />
        </div>
      </div>
    </main>
  );
}
