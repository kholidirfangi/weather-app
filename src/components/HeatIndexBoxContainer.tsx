import type { OpenMeteoResponse } from "../types/weather.type";

interface HeatIndexBoxContainerProps {
  weather: OpenMeteoResponse | null;
}

interface HeatIndexBoxProps {
  name: string;
  value: string;
}

const HeatIndexBox = ({ name, value }: HeatIndexBoxProps) => {
  return (
    <div className="flex flex-col gap-5 bg-neutral-800 p-5 rounded-xl border-2 border-neutral-600 text-white font-display">
      <div>{name}</div>
      <div className="text-3xl">{value}</div>
    </div>
  );
};

const HeatIndexBoxContainer = ({ weather }: HeatIndexBoxContainerProps) => {
  // console.log(weather);
  if (!weather) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-5 xl:grid-cols-4 xl:grid-rows-1">
      <HeatIndexBox
        name="Feels Like"
        value={`${Math.round(weather.hourly.temperature_2m[0])} ${
          weather.hourly_units.temperature_2m
        }`}
      />
      <HeatIndexBox
        name="Humidity"
        value={`${Math.round(weather.hourly.relative_humidity_2m[0])} ${
          weather.hourly_units.relative_humidity_2m
        }`}
      />
      <HeatIndexBox
        name="Wind"
        value={`${Math.round(weather.hourly.relative_humidity_2m[0])} ${
          weather.hourly_units.wind_speed_10m
        }`}
      />
      <HeatIndexBox
        name="Precipitation"
        value={`${Math.round(weather.hourly.relative_humidity_2m[0])} ${
          weather.hourly_units.precipitation
        }`}
      />
    </div>
  );
};

export default HeatIndexBoxContainer;
