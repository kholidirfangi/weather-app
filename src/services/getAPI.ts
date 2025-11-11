import type { OpenMeteoResponse, GeocodingResult } from "../types/weather.type";

interface Params {
  city: string;
  temperatureUnit: number;
  windSpeedUnit: number;
  precipitationUnit: number;
}

const getWeatherAPI = async ({
  city,
  temperatureUnit,
  windSpeedUnit,
  precipitationUnit,
}: Params) => {
  try {
    // Convert unit index to format API
    const tempUnit = temperatureUnit === 0 ? "celsius" : "fahrenheit";
    const windUnit = windSpeedUnit === 0 ? "kmh" : "mph";
    const precipUnit = precipitationUnit === 0 ? "mm" : "inch";

    // Get Ordinat from geocoding
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=id&format=json`
    );

    const geoData = await res.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Data tidak ditemukan");
    }

    const { latitude, longitude } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=Asia/Jakarta&current=temperature_2m,wind_speed_10m&hourly=weathercode,temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&daily=weathercode,temperature_2m_min,temperature_2m_max&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}&precipitation_unit=${precipUnit}`
    );

    const weatherData: OpenMeteoResponse = await weatherRes.json();

    return {
      location: geoData.results[0] as GeocodingResult,
      weather: weatherData,
    };
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export default getWeatherAPI;
