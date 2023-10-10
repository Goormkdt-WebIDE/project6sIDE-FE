type SearchInputProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  messageSearch: () => void;
};

function SearchInput({
  searchValue,
  setSearchValue,
  messageSearch,
}: SearchInputProps) {
  return (
    <div className="p-4 border-b border-gray-300 flex items-center">
      <input
        type="text"
        className="w-full border border-gray-300 rounded p-2 mr-2"
        placeholder="Search Messages"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            messageSearch();
          }
        }}
      />
      <button
        className="bg-blue-400 text-white font-thin letter-spacing-2 py-2 px-4 rounded disabled:opacity-50 letter-spacing-2 hover:bg-blue-500 active:transform active:translate-y-3 active:border-transparent active:opacity-80 cursor-pointer"
        onClick={messageSearch}
      >
        SEARCH
      </button>
    </div>
  );
}

export default SearchInput;
