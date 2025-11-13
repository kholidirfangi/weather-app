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
  const [isSearching, setIsSearching] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState(0); // 0 = Celsius, 1 = Fahrenheit
  const [windSpeedUnit, setWindSpeedUnit] = useState(0); // 0 = km, 1 = mph
  const [precipitationUnit, setPrecipitationUnit] = useState(0); // 0 = mm, 1 = inchi
  const [lastSearchedCity, setLastSearchedCity] = useState("Kebumen"); // Simpan kota terakhir yang dicari

  useEffect(() => {
    const initialFetchWeatherAPI = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await getWeatherAPI({
          city: lastSearchedCity, // Gunakan lastSearchedCity, bukan hardcode "Kebumen"
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
      } catch (error) {
        console.error("Error fetching weather:", error);
        setError("Gagal mengambil data cuaca. Silakan coba lagi.");
        setWeather(null);
      } finally {
        setIsLoading(false);
      }
    };
    initialFetchWeatherAPI();
  }, [temperatureUnit, windSpeedUnit, precipitationUnit, lastSearchedCity]); // Tambahkan lastSearchedCity ke dependency

  const handleSearch = async () => {
    if (city.trim()) {
      try {
        setIsSearching(true);
        setError("");
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
          setLastSearchedCity(city); // Update lastSearchedCity saat search berhasil
        }
      } catch (error) {
        console.error("Error searching weather:", error);
        setError(`Gagal mencari data cuaca. Silakan coba lagi.`);
        setWeather(null);
      } finally {
        setIsSearching(false);
        setCity("");
      }
    }
  };

  const handleRetry = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getWeatherAPI({
        city: lastSearchedCity,
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
    } catch (error) {
      console.error("Error retrying weather:", error);
      setError("Gagal mengambil data cuaca. Silakan coba lagi.");
      setWeather(null);
    } finally {
      setIsLoading(false);
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
      {error ? (
        <div className="flex flex-col items-center mt-10 text-neutral-200 p-5">
          <img
            className="w-16 mb-5"
            src="./assets/images/icon-error.svg"
            alt="error icon"
          />
          <h1 className="text-4xl mb-3 font-bold">Kesalahan terjadi</h1>
          <p className="text-center mb-2">{error}</p>
          <p className="text-sm text-neutral-400 mb-5">
            Kota: {lastSearchedCity}
          </p>
          <button
            onClick={handleRetry}
            disabled={isLoading}
            className={`py-2 px-6 rounded-lg mt-3 transition-colors ${
              isLoading
                ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
                : "bg-neutral-800 hover:bg-neutral-600 cursor-pointer"
            }`}
          >
            {isLoading ? "Mencoba..." : "Coba lagi"}
          </button>
        </div>
      ) : (
        <main className="p-5">
          <Hero />
          <div className="flex flex-col gap-4 xl:flex-row xl:gap-5 xl:px-32 justify-center w-full items-center">
            <SearchInput
              city={city}
              setCity={setCity}
              onSearch={handleSearch}
              isSearching={isSearching}
            />
            <SearchButton onClick={handleSearch} />
          </div>
          {/* content */}
          <div className="flex flex-col xl:flex-row xl:gap-5">
            <div className="w-full xl:w-4/6">
              <Banner weather={weather} isLoading={isLoading} />
              <HeatIndexBoxContainer
                weather={weather?.weather || null}
                isLoading={isLoading}
              />
              <DailyForecastContainer
                weather={weather?.weather || null}
                isLoading={isLoading}
              />
            </div>
            <div className="w-full xl:w-2/6">
              <HourlyForecastContainer
                weather={weather?.weather || null}
                isLoading={isLoading}
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;