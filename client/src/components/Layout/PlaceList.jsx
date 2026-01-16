import PlaceCard from "./PlaceCard";

function PlaceList({ places, handleClick }) {
  if (!Array.isArray(places)) return null;

  return (
    <section className="flex w-full max-w-5xl flex-col gap-6">
      {places.map((place) => (
        <PlaceCard
          key={place.eid}
          place={place}
          handleClick={handleClick}
        />
      ))}
    </section>
  );
}

export default PlaceList;
