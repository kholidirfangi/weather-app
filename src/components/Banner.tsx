import type { weatherParams } from "../types/weather.type";

interface BannerParams {
  weather: weatherParams | null;
}

const Banner = ({ weather }: BannerParams) => {
  // Fungsi untuk format tanggal dengan pengecekan
  const formatDate = (
    dateString: string | undefined,
    timezone: string | undefined
  ): string => {
    if (!dateString) return "-";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) return "-";

      return new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: timezone,
      }).format(date);
    } catch {
      return "-";
    }
  };

  const formattedDate = formatDate(
    weather?.weather.current.time,
    weather?.location.timezone
  );
  return (
    <div className="mt-5 flex flex-col justify-center items-center relative mx-auto w-full">
      <picture className="w-full">
        <source
          media="(min-width: 800px)"
          srcSet="./assets/images/bg-today-large.svg"
        />
        <img
          className="w-full"
          src="./assets/images/bg-today-small.svg"
          alt="banner"
        />
      </picture>
      <div className="w-full top-8 md:top-12 xl:top-auto absolute text-center md:items-center md:justify-between flex flex-col md:flex-row md:px-10 px-5">
        <div>
          <h2 className="text-white font-display-secondary text-2xl font-semibold mb-2">
            {`${weather?.location.name}, ${weather?.location.country}`}
          </h2>
          <p className="text-neutral-200">{formattedDate}</p>
        </div>
        <p className="text-white font-display text-8xl italic mt-10 ml-40 xl:ml-0 xl:mt-0">
          {weather?.weather.current.temperature_2m
            ? Math.round(weather.weather.current.temperature_2m) + "°"
            : "-"}
        </p>
      </div>
      <img
        className="w-28 absolute top-32 right-52 md:top-20  xl:top-20"
        src="./assets/images/icon-sunny.webp"
        alt=""
      />
    </div>
  );
};

export default Banner;
