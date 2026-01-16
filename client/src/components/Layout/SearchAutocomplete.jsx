import { useState } from "react";

function SearchAutocomplete({ value, onChange, suggestions }) {
  // State: control visibility of suggestion dropdown
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full max-w-4xl">
      {/* Search input: source of truth comes from parent */}
      <input
        type="text"
        value={value}
        placeholder="หาที่เที่ยวแล้วไปกัน..."
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => suggestions.length && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="
          w-full h-12 px-4
          bg-white
          text-gray-800
          placeholder-gray-400
          border-b border-gray-300
          focus:outline-none
          focus:border-sky-500
        "
      />

      {/* Suggestion dropdown: rendered only when focused and data is available */}
      {open && suggestions.length > 0 && (
        <ul
          className="
            absolute top-full left-0 right-0
            z-50 mt-1
            bg-white
            rounded-md
            shadow-lg
          "
        >
          {suggestions.map((item) => (
            <li
              key={item}
              // onMouseDown is used to avoid losing focus
              // before click event is registered (blur happens first)
              onMouseDown={() => {
                onChange(item);
                setOpen(false);
              }}
              className="
                cursor-pointer
                px-4 py-2
                hover:bg-gray-100
              "
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchAutocomplete;
