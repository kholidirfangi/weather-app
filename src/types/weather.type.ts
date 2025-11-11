// Interface untuk response open meteo API
export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  current: {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    precipitation: number[];
    weathercode: number[];
  };
  hourly_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    precipitation: string;
  };
  daily: {
    time: string[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    weathercode: number[];
  };
  daily_units: {
    temperature_2m_min: string;
    temperature_2m_max: string;
  };
}

// Interface untuk geocoding response
export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  timezone: string;
}

export interface weatherParams {
  location: GeocodingResult;
  weather: OpenMeteoResponse;
}
