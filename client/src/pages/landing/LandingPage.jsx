import axios from "axios";
import { useEffect, useState } from "react";
import PlaceList from "../../components/Layout/PlaceList";

function LandingPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Intent: merge clicked tag into search keyword without duplication
  const handleClick = (tag) => {
    setSearch((prev) => {
      const words = prev.trim().split(/\s+/).filter(Boolean);
      const keywordSet = new Set(words);

      if (keywordSet.has(tag)) {
        return prev;
      }

      keywordSet.add(tag);
      return Array.from(keywordSet).join(" ");
    });
  };

  useEffect(() => {
    // Boundary: debounce API call when search keyword changes
    const timer = setTimeout(() => {
      fetchPlaces();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <section className="flex flex-col items-center gap-5 p-24">
      <header>
        <h1 className="text-5xl font-bold text-sky-500">เที่ยวไหนดี</h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-4xl flex-col gap-2"
      >
        <label className="text-sm font-medium text-gray-700">
          ค้นหาที่เที่ยว
        </label>

        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            h-12
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
      </form>

      <section className="flex justify-center py-12">
        <PlaceList places={data} handleClick={handleClick} />
      </section>
    </section>
  );
}

export default LandingPage;
