import { useState } from "react";

interface UnitsProps {
  temperatureUnit: number;
  windSpeedUnit: number;
  precipitationUnit: number;
  setTemperatureUnit: (value: number) => void;
  setWindSpeedUnit: (value: number) => void;
  setPrecipitationUnit: (value: number) => void;
}

interface ContentProps {
  title: string;
  options: string[];
  activeIndex: number;
}

const Content = ({ title, options, activeIndex }: ContentProps) => {
  return (
    <div className="border-b-2 border-b-neutral-600 pb-2 last:border-0">
      <h5 className="text-neutral-400 px-2 mt-2 ">{title}</h5>

      {options.map((option, index) => (
        <div
          key={index}
          className={`${
            activeIndex === index ? "bg-neutral-700" : ""
          } flex items-center justify-between p-2 rounded-lg`}
        >
          <div>{option}</div>

          {activeIndex === index && (
            <img
              src="./assets/images/icon-checkmark.svg"
              alt="icon-checkmark"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const Units = ({
  temperatureUnit,
  windSpeedUnit,
  precipitationUnit,
  setTemperatureUnit,
  setWindSpeedUnit,
  setPrecipitationUnit,
}: UnitsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenUnits = () => {
    setIsOpen(!isOpen);
  };

  const handleSwitchMode = () => {
    // Toggle metric (0) / imperial (1)
    const newMode = temperatureUnit === 0 ? 1 : 0;
    setTemperatureUnit(newMode);
    setWindSpeedUnit(newMode);
    setPrecipitationUnit(newMode);
  };
  return (
    <div className="relative ">
      <button
        onClick={handleOpenUnits}
        className="flex justify-between gap-2 items-center bg-neutral-700 rounded-md p-2 text-xs cursor-pointer hover:bg-neutral-500 transition-colors duration-200"
      >
        <img
          className="w-5 "
          src="../assets/images/icon-units.svg"
          alt="Icon Units"
        />
        <span className="text-white font-display">Units</span>
        <img
          className={`${
            isOpen ? "rotate-180" : ""
          } transition-transform duration-200 `}
          src="../assets/images/icon-dropdown.svg"
          alt=""
        />
      </button>

      {isOpen ? (
        <div className="w-52 text-white absolute top-10 right-0 z-10 bg-neutral-800 p-2 rounded-xl border-2 border-neutral-600">
          <button
            onClick={handleSwitchMode}
            className="w-full p-2 hover:bg-neutral-700 rounded-lg mb-2 cursor-pointer text-start"
          >
            {temperatureUnit === 0 ? "Ubah ke Imperial" : "Ubah ke Metrik"}
          </button>
          <Content
            title="Suhu"
            options={["Celsius (°C)", "Fahrenheit (°F)"]}
            activeIndex={temperatureUnit}
          />
          <Content
            title="Kecepatan Angin"
            options={["km/h", "mph"]}
            activeIndex={windSpeedUnit}
          />
          <Content
            title="Curah Hujan"
            options={["Milimeters (mm)", "Inchi (in)"]}
            activeIndex={precipitationUnit}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Units;
