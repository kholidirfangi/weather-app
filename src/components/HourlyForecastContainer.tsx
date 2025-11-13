import type { OpenMeteoResponse } from "../types/weather.type";
import { useState, useEffect, useRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const CustomSelect = ({
  options,
  defaultValue,
  onChange,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0]?.value
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-neutral-600 px-4 py-2 rounded-lg text-sm text-white cursor-pointer hover:bg-neutral-500 transition-colors flex items-center gap-2 min-w-[120px] justify-between"
      >
        <span>{selectedOption?.label}</span>
        <img
          src="./assets/images/icon-dropdown.svg"
          alt="icon-dropdown"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-neutral-700 rounded-lg shadow-lg overflow-hidden z-10 border border-neutral-600 p-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-2 my-1 text-left text-sm text-white hover:bg-neutral-600 transition-colors flex items-center justify-between rounded-lg ${
                selectedValue === option.value ? "bg-neutral-600" : ""
              }`}
            >
              <span>{option.label}</span>
              {selectedValue === option.value && (
                <img
                  src="./assets/images/icon-checkmark.svg"
                  alt="icon-checkmark"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface HourlyForecastBoxProps {
  image: string;
  text: string;
  temp: string;
  isLoading: boolean;
}

interface HourlyForecastContainerProps {
  weather: OpenMeteoResponse | null;
  isLoading: boolean;
}

const HourlyForecastBox = ({
  image,
  text,
  temp,
  isLoading,
}: HourlyForecastBoxProps) => {
  return isLoading ? (
    <div className="flex justify-between items-center h-12 bg-neutral-700 px-2 py-1 rounded-xl mt-4 animate-pulse">
      {/* <div className="flex gap-5 items-center">
        <img
          className="w-10"
          src={`./assets/images/icon-${image}.webp`}
          alt={`icon-${image}`}
        />
        <div>{text}</div>
      </div>
      <div>{temp}</div> */}
    </div>
  ) : (
    <div className="flex justify-between items-center bg-neutral-700 px-2 py-1 rounded-xl mt-4 animate-fadeIn">
      <div className="flex gap-5 items-center">
        <img
          className="w-10"
          src={`./assets/images/icon-${image}.webp`}
          alt={`icon-${image}`}
        />
        <div>{text}</div>
      </div>
      <div>{temp}</div>
    </div>
  );
};

const HourlyForecastContainer = ({
  weather,
  isLoading,
}: HourlyForecastContainerProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const itemsPerPage = 8;

  // Helper function untuk mapping weather code ke icon
  const getWeatherIcon = (weathercode: number): string => {
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
    return image;
  };

  // Generate options dari weather.daily.time
  const daysOptions =
    weather?.daily.time.map((date, index) => {
      const dayName = new Date(date).toLocaleDateString("id-ID", {
        weekday: "long",
      });

      const label = index === 0 ? "Hari Ini" : dayName;

      return {
        value: date,
        label: label,
      };
    }) || [];

  // Set default selected date ke hari pertama
  useEffect(() => {
    if (weather?.daily.time && weather.daily.time.length > 0 && !selectedDate) {
      setSelectedDate(weather.daily.time[0]);
    }
  }, [weather, selectedDate]);

  // Reset page ke 1 ketika tanggal berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate]);

  // Filter hourly data berdasarkan tanggal yang dipilih
  const getHourlyDataForSelectedDate = () => {
    if (!weather || !selectedDate) return [];

    const hourlyData = [];

    for (let i = 0; i < weather.hourly.time.length; i++) {
      const hourlyDate = weather.hourly.time[i].split("T")[0];

      if (hourlyDate === selectedDate) {
        const hour = new Date(weather.hourly.time[i]).getHours();
        // console.log(hour);
        // const formattedHour =
        //   hour === 0
        //     ? "12 AM"
        //     : hour < 12
        //     ? `${hour} AM`
        //     : hour === 12
        //     ? "12 PM"
        //     : `${hour - 12} PM`;

        const formatedHour = hour < 10 ? `0${hour}.00` : `${hour}.00`;

        hourlyData.push({
          time: formatedHour,
          temp: `${Math.round(weather.hourly.temperature_2m[i])}°`,
          weatherCode: weather.hourly.weathercode?.[i] || 0,
        });
      }
    }

    return hourlyData;
  };

  const allHourlyData = getHourlyDataForSelectedDate();

  // Pagination logic
  const totalPages = Math.ceil(allHourlyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHourlyData = allHourlyData.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 150);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  if (isLoading && !weather) {
    return (
      <div className="mt-5 flex justify-center">
        <div className="max-w-2xl w-full text-white p-5 bg-neutral-800 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Ramalan perjam</h3>
            <div className="flex items-center justify-end min-w-[120px] h-9 rounded-lg bg-neutral-600 pe-4 animate-pulse">
              <img src="./assets/images/icon-dropdown.svg" alt="" />
            </div>
          </div>

          {/* Skeleton untuk 8 item */}
          {Array.from({ length: 8 }).map((_, index) => (
            <HourlyForecastBox
              key={index}
              isLoading={true}
              image=""
              temp=""
              text=""
            />
          ))}

          {/* Skeleton Pagination */}
          <div className="flex justify-between items-center mt-8">
            <div className="h-8 w-28 bg-neutral-700 rounded-lg animate-pulse"></div>
            <div className="h-4 w-12 bg-neutral-700 rounded animate-pulse"></div>
            <div className="h-8 w-28 bg-neutral-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="mt-5 flex justify-center">
      <div className="max-w-2xl w-full text-white p-5 bg-neutral-800 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Ramalan perjam</h3>
          <CustomSelect
            options={daysOptions}
            defaultValue={daysOptions[0]?.value}
            onChange={(value) => {
              setSelectedDate(value);
              console.log("Selected date:", value);
            }}
          />
        </div>

        <div
          className={`transition-opacity duration-150 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentHourlyData.length > 0 ? (
            currentHourlyData.map((data, index) => (
              <HourlyForecastBox
                isLoading={false}
                key={`${currentPage}-${index}`}
                image={getWeatherIcon(data.weatherCode)}
                temp={data.temp}
                text={data.time}
              />
            ))
          ) : (
            <div className="text-center text-neutral-400 mt-4">
              Data tidak ditemukan
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={goToPrevPage}
              disabled={currentPage === 1 || isTransitioning}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                currentPage === 1 || isTransitioning
                  ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
                  : "bg-neutral-600 text-white hover:bg-neutral-500"
              }`}
            >
              Sebelumnya
            </button>

            <div className="text-xs text-neutral-300">
              {currentPage} / {totalPages}
            </div>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={currentPage === totalPages || isTransitioning}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                currentPage === totalPages || isTransitioning
                  ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
                  : "bg-neutral-600 text-white hover:bg-neutral-500"
              }`}
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HourlyForecastContainer;
