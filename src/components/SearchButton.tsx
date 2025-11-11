interface SearchButtonParams {
  onClick: () => void;
}

const SearchButton = ({ onClick }: SearchButtonParams) => {
  return (
    <button
      onClick={onClick}
      className="px-5 h-12 bg-blue-500 rounded-xl text-white w-full xl:w-32 hover:opacity-80 cursor-pointer"
    >
      Cari
    </button>
  );
};

export default SearchButton;
