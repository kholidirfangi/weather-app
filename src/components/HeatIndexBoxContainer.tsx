import type { OpenMeteoResponse } from "../types/weather.type";

interface HeatIndexBoxContainerProps {
  weather: OpenMeteoResponse | null;
  isLoading: boolean;
}

interface HeatIndexBoxProps {
  name: string;
  value: string;
  isLoading: boolean;
}

const HeatIndexBox = ({ name, value, isLoading }: HeatIndexBoxProps) => {
  return isLoading ? (
    <div className="flex flex-col gap-5 bg-neutral-800 p-5 rounded-xl border-2 border-neutral-600 text-white font-display animate-pulse">
      <div>{name}</div>
      <div className="text-3xl">-</div>
    </div>
  ) : (
    <div className="flex flex-col gap-5 bg-neutral-800 p-5 rounded-xl border-2 border-neutral-600 text-white font-display">
      <div>{name}</div>
      <div className="text-3xl">{value}</div>
    </div>
  );
};

const HeatIndexBoxContainer = ({
  weather,
  isLoading,
}: HeatIndexBoxContainerProps) => {
  if (isLoading && !weather) {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-5 xl:grid-cols-4 xl:grid-rows-1">
        <HeatIndexBox isLoading={true} name="Feels Like" value="0" />
        <HeatIndexBox isLoading={true} name="Humidity" value="" />
        <HeatIndexBox isLoading={true} name="Wind" value="" />
        <HeatIndexBox isLoading={true} name="Precipitation" value="" />
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-5 xl:grid-cols-4 xl:grid-rows-1">
      <HeatIndexBox
        isLoading={false}
        name="Feels Like"
        value={`${Math.round(weather.hourly.temperature_2m[0])} ${
          weather.hourly_units.temperature_2m
        }`}
      />
      <HeatIndexBox
        isLoading={false}
        name="Humidity"
        value={`${Math.round(weather.hourly.relative_humidity_2m[0])} ${
          weather.hourly_units.relative_humidity_2m
        }`}
      />
      <HeatIndexBox
        isLoading={false}
        name="Wind"
        value={`${Math.round(weather.hourly.relative_humidity_2m[0])} ${
          weather.hourly_units.wind_speed_10m
        }`}
      />
      <HeatIndexBox
        isLoading={false}
        name="Precipitation"
        value={`${Math.round(weather.hourly.relative_humidity_2m[0])} ${
          weather.hourly_units.precipitation
        }`}
      />
    </div>
  );
};

export default HeatIndexBoxContainer;
