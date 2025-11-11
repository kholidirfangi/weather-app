import type { ChangeEvent } from "react";

interface Params {
  city: string;
  setCity: (value: string) => void;
  onSearch?: () => void;
}

const SearchInput = ({ city, setCity, onSearch }: Params) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      e.preventDefault(); // Penting: cegah form submit default
      onSearch();
    }
  };
  return (
    <form className="flex gap-5 justify-start w-full bg-neutral-600 h-12 px-6 rounded-xl xl:w-96">
      <img className="w-4" src="./assets/images/icon-search.svg" alt="" />
      <input
        className="text-white w-full outline-none cursor-pointer"
        type="text"
        placeholder="Cari daerah..."
        value={city}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchInput;
