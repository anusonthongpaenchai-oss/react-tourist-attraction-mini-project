import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import PlaceList from "../../components/Layout/PlaceList";
import PageHeader from "../../components/Layout/PageHeader";
import SearchForm from "../../components/Layout/SearchForm";

function LandingPage() {
  // ===== Core page state =====
  // Source of truth for fetched places and current search keyword
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // ===== Autocomplete UI state =====
  // suggestions: derived tag list shown in dropdown
  // showSuggest: explicit control for suggestion visibility
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);

  // ===== Data fetching =====
  // Responsibility: fetch places based on current search keyword
  const fetchPlaces = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${search}`
      );
      setData(result.data.data);
    } catch (err) {
      alert(err);
    }
  };

  // ===== Tag click handler =====
  // Intent: merge clicked tag into search string without duplication
  const handleClick = (tag) => {
    setSearch((prev) => {
      const words = prev.trim().split(/\s+/).filter(Boolean);
      const keywordSet = new Set(words);

      if (keywordSet.has(tag)) return prev;

      keywordSet.add(tag);
      return Array.from(keywordSet).join(" ");
    });
  };

  // ===== Search debounce =====
  // Boundary: delay API calls while user is typing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPlaces();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ===== Derived data =====
  // Collect unique tags from fetched places
  // useMemo prevents recomputation and effect dependency loops
  const allTags = useMemo(() => {
    return Array.from(new Set(data.flatMap((place) => place.tags)));
  }, [data]);

  // ===== Autocomplete behavior =====
  // Responsibility: filter tags based on current search keyword
  useEffect(() => {
    if (!search.trim()) {
      if (showSuggest) setShowSuggest(false);
      if (suggestions.length) setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = allTags.filter((tag) => tag.includes(search));

      setSuggestions(filtered.slice(0, 6));
      setShowSuggest(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, allTags]);

  return (
    <section className="flex flex-col items-center gap-5 p-24">
      {/* Page-level heading */}
      <PageHeader title="เที่ยวไหนดี" />

      {/* Controlled search form + autocomplete */}
      <SearchForm
        search={search}
        onSearchChange={setSearch}
        suggestions={suggestions}
        showSuggest={showSuggest}
        setShowSuggest={setShowSuggest}
      />

      {/* Search result list */}
      <div className="flex justify-center py-12">
        <PlaceList places={data} handleClick={handleClick} />
      </div>
    </section>
  );
}

export default LandingPage;
