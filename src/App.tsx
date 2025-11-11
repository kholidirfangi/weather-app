import Hero from "./components/Hero";
import Logo from "./components/Logo";
import Units from "./components/Units";
import SearchInput from "./components/SearchInput";
import SearchButton from "./components/SearchButton";
import Banner from "./components/Banner";
import DailyForecastContainer from "./components/DailyForecastContainer";
import HeatIndexBoxContainer from "./components/HeatIndexBoxContainer";
import HourlyForecastContainer from "./components/HourlyForecastContainer";
import getWeatherAPI from "./services/getAPI";
import type { weatherParams } from "./types/weather.type";
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<weatherParams | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState(0); // 0 = Celsius, 1 = Fahrenheit
  const [windSpeedUnit, setWindSpeedUnit] = useState(0); // 0 = km, 1 = mph
  const [precipitationUnit, setPrecipitationUnit] = useState(0); // 0 = mm, 1 = inchi

  useEffect(() => {
    const initialFetchWeatherAPI = async () => {
      setIsLoading(true);
      try {
        const data = await getWeatherAPI({
          city: "Kebumen",
          temperatureUnit: temperatureUnit,
          windSpeedUnit: windSpeedUnit,
          precipitationUnit: precipitationUnit,
        });
        if (!data || !data.weather) {
          setError("Data tidak ditemukan");
          setWeather(null);
        } else {
          setError("");
          setWeather(data);
        }
      } catch {
        setError("Data tidak ditemukan");
        setWeather(null);
      } finally {
        setIsLoading(false);
      }
    };
    initialFetchWeatherAPI();
  }, [temperatureUnit, windSpeedUnit, precipitationUnit]);

  const handleSearch = async () => {
    if (city.trim()) {
      try {
        setIsLoading(true);
        const data = await getWeatherAPI({
          city,
          temperatureUnit: temperatureUnit,
          windSpeedUnit: windSpeedUnit,
          precipitationUnit: precipitationUnit,
        });

        if (!data || !data.weather) {
          setError("Data tidak ditemukan");
          setWeather(null);
        } else {
          setWeather(data);
          setError("");
        }
      } catch {
        setError("Data tidak ditemukan");
        setWeather(null);
      } finally {
        setIsLoading(false);
        setCity("");
      }
    }
  };
  return (
    <div className="min-h-screen bg-blue-700 font-display-primary md:px-10 xl:px-40">
      <header className="flex justify-between px-5 py-4 xl:py-10">
        <Logo />
        <Units
          temperatureUnit={temperatureUnit}
          windSpeedUnit={windSpeedUnit}
          precipitationUnit={precipitationUnit}
          setTemperatureUnit={setTemperatureUnit}
          setWindSpeedUnit={setWindSpeedUnit}
          setPrecipitationUnit={setPrecipitationUnit}
        />
      </header>
      <main className="p-5">
        <Hero />
        <div className="flex flex-col gap-4 xl:flex-row xl:gap-5 xl:px-32 justify-center w-full items-center">
          <SearchInput city={city} setCity={setCity} onSearch={handleSearch} />
          <SearchButton onClick={handleSearch} />
        </div>
        {/* content */}
        {error ? (
          <div className="text-white text-2xl text-center mt-20">
            Data tidak ditemukan
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center scale-200 mt-20 animate-spin">
                <img
                  src="./assets/images/icon-loading.svg"
                  alt="icon-loading"
                />
              </div>
            ) : (
              <div className="flex flex-col xl:flex-row xl:gap-5">
                <div className="w-full xl:w-4/6">
                  <Banner weather={weather} />
                  <HeatIndexBoxContainer weather={weather?.weather || null} />
                  <DailyForecastContainer weather={weather?.weather || null} />
                </div>

                <div className="w-full xl:w-2/6">
                  <HourlyForecastContainer weather={weather?.weather || null} />
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
