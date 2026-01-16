function SearchForm({
  search,
  onSearchChange,
  suggestions,
  showSuggest,
  setShowSuggest,
}) {
  return (
    <form className="flex w-[800px] flex-col gap-2">
      {/* Accessible label for search input */}
      <label htmlFor="search-input">ค้นหาที่เที่ยว</label>

      {/* Input + suggestion dropdown wrapper */}
      <div className="relative">
        <input
          id="search-input"
          type="text"
          value={search}
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => suggestions.length && setShowSuggest(true)}
          onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
          className="
            w-full h-12
            text-center
            bg-white
            text-gray-800
            placeholder-gray-400
            border-b border-gray-300
            focus:outline-none
            focus:ring-2 focus:ring-sky-400
            focus:border-sky-400
          "
        />

        {/* Suggestion dropdown: controlled entirely by parent state */}
        {showSuggest && suggestions.length > 0 && (
          <ul
            className="
              absolute top-full left-0 right-0
              z-50 mt-1
              bg-white
              rounded-md
              shadow-lg
            "
          >
            {suggestions.map((tag) => (
              <li
                key={tag}
                // onMouseDown prevents blur from closing the dropdown
                // before the click action is handled
                onMouseDown={() => {
                  onSearchChange(tag);
                  setShowSuggest(false);
                }}
                className="
                  cursor-pointer
                  px-4 py-2
                  hover:bg-gray-100
                "
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}

export default SearchForm;
