import { type ChangeEvent } from "react";

interface Params {
  city: string;
  setCity: (value: string) => void;
  onSearch?: () => void;
  isSearching: boolean;
}

const SearchInput = ({ city, setCity, onSearch, isSearching }: Params) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      e.preventDefault(); // Penting: cegah form submit default
      onSearch();
    }
  };
  return (
    <div className="relative w-full xl:w-auto">
      <form className="flex gap-5 justify-start w-full bg-neutral-600 h-12 px-6 rounded-xl xl:w-96">
        <img className="w-4" src="./assets/images/icon-search.svg" alt="" />
        <input
          className="text-white w-full outline-none cursor-pointer"
          type="text"
          placeholder="Cari daerah..."
          value={city}
          onKeyDown={handleSearch}
          onChange={handleChange}
        />
      </form>
      {isSearching && (
        <div className="absolute left-0 top-14 z-10 flex gap-2 items-center justify-start w-full bg-neutral-600 h-12 px-6 rounded-xl xl:w-96">
          <img
            className={`w-4 ${isSearching ? "animate-spin" : ""}`}
            src="./assets/images/icon-loading.svg"
            alt=""
          />
          <div className="text-neutral-100 text-sm w-full outline-none cursor-pointer ">
            Pencarian sedang berlangsung
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
