import type { OpenMeteoResponse } from "../types/weather.type";

interface DailyForecastContainerProps {
  weather: OpenMeteoResponse | null;
  isLoading: boolean;
}

interface DailyForecastBoxProps {
  weather: OpenMeteoResponse | null;
  image: string;
  day: string;
  minTemp: number;
  maxTemp: number;
  isLoading: boolean;
}

const DailyForecastBox = ({
  image,
  day,
  minTemp,
  maxTemp,
  isLoading,
}: DailyForecastBoxProps) => {
  return isLoading ? (
    <div className="bg-neutral-800 border-2 border-neutral-600 h-40 rounded-xl animate-pulse"></div>
  ) : (
    <div className="bg-neutral-800 p-2 rounded-xl border-2 border-neutral-600 text-white font-display">
      <p className="text-center">{day}</p>
      <img
        className="my-2"
        src={`./assets/images/icon-${image}.webp`}
        alt={`icon-${image}`}
      />
      <div className="flex justify-between">
        <div>{`${minTemp} °`}</div>
        <div>{`${maxTemp} °`}</div>
      </div>
    </div>
  );
};

const DailyForecastContainer = ({
  weather,
  isLoading,
}: DailyForecastContainerProps) => {
  if (isLoading && !weather) {
    return (
      <div>
        <h3 className="text-white text-xl mt-8 mb-5 font-display-secondary">
          Ramalan harian
        </h3>
        <div className="grid grid-cols-3 grid-rows-3 gap-2 md:grid-rows-2 md:grid-cols-4 xl:grid-rows-1 xl:grid-cols-7">
          {/* <div className="bg-neutral-800 border-2 border-neutral-600 h-40 rounded-xl"></div> */}
          {Array.from({ length: 7 }).map((_, index) => (
            <DailyForecastBox
              key={index}
              isLoading={true}
              weather={null}
              image={""}
              day={""}
              minTemp={0}
              maxTemp={0}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!weather?.daily) return null;
  return (
    <div>
      <h3 className="text-white text-xl mt-8 mb-5 font-display-secondary">
        Ramalan harian
      </h3>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 md:grid-rows-2 md:grid-cols-4 xl:grid-rows-1 xl:grid-cols-7">
        {weather?.daily.time.map((date, index) => {
          const dayName = new Date(date).toLocaleDateString("id-ID", {
            weekday: "long",
          });
          const minTemp = weather?.daily.temperature_2m_min[index];
          const maxTemp = weather?.daily.temperature_2m_max[index];
          const weathercode = weather?.daily.weathercode[index];

          // Skip jika data tidak valid
          if (minTemp === undefined || maxTemp === undefined) return null;

          let image = "";
          switch (weathercode) {
            case 0:
            case 1:
              image = "sunny";
              break;
            case 2:
              image = "partly-cloudy";
              break;
            case 3:
              image = "overcast";
              break;
            case 45:
            case 48:
              image = "fog";
              break;
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
              image = "drizzle";
              break;
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
            case 80:
            case 81:
            case 82:
              image = "rain";
              break;
            case 71:
            case 73:
            case 75:
            case 77:
              image = "snow";
              break;
            case 95:
            case 96:
            case 99:
              image = "storm";
              break;
          }

          return (
            <DailyForecastBox
              isLoading={false}
              key={date}
              image={image}
              day={index === 0 ? "Hari Ini" : dayName}
              minTemp={Math.round(minTemp)}
              maxTemp={Math.round(maxTemp)}
              weather={weather}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecastContainer;
