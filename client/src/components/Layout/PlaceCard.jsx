import { Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { ArrowBigRightDash } from 'lucide-react';
import { ArrowBigLeftDash } from 'lucide-react';

function PlaceCard({ place, handleClick }) {
    // ===== Image Preview State =====
    // null = preview closed
    // number = index of image currently shown in overlay
    const [previewIndex, setPreviewIndex] = useState(null);
  
    // Source of truth for all images used in this card
    const images = place.photos ?? [];
  
    // ===== Clipboard Action =====
    // Responsibility: copy place URL for sharing
    const copyToClipboard = (text) => {
      const textField = document.createElement("textarea");
      textField.value = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      alert(`Copy Link: ${place.title}`);
    };
  
    // ===== Derived State =====
    // Guard rendering logic to avoid accessing empty image array
    const hasGallery = images.length > 0;
  
    return (
      <article className="flex gap-6 p-4 rounded-2xl transition hover:bg-gray-300">
        {/* Primary image: entry point for opening image preview */}
        {hasGallery && (
          <img
            src={images[0]}
            alt={place.title}
            onClick={() => setPreviewIndex(0)}
            className="
              flex-shrink-0
              h-[180px] w-[260px]
              cursor-pointer
              rounded-2xl
              object-cover
              hover:opacity-90
            "
          />
        )}
  
        {/* Main content area */}
        <div className="flex flex-1 flex-col gap-2">
          {/* External navigation to place detail */}
          <a
            href={place.url}
            target="_blank"
            rel="noreferrer"
            className="text-lg font-semibold text-gray-800 hover:underline"
          >
            {place.title}
          </a>
  
          {/* Short description with length guard */}
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
            {place.description.length > 100
              ? place.description.slice(0, 100) + "..."
              : place.description}
          </p>
  
          {/* Explicit call-to-action */}
          <a
            href={place.url}
            target="_blank"
            rel="noreferrer"
            className="w-20 text-start text-sm text-sky-500 underline"
          >
            อ่านต่อ
          </a>
  
          {/* Search-enhancing tags */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
            {place.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleClick(tag)}
                className="hover:underline"
              >
                {tag}
              </button>
            ))}
          </div>
  
          {/* Thumbnails + secondary actions */}
          <div className="mt-2 flex items-center justify-between gap-3">
            {/* Secondary image previews (exclude primary image) */}
            <div className="flex gap-2">
              {images.slice(1, 4).map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt="thumbnail"
                  onClick={() => setPreviewIndex(index + 1)}
                  className="
                    h-14 w-14
                    cursor-pointer
                    rounded-lg
                    object-cover
                    hover:opacity-80
                  "
                />
              ))}
            </div>
  
            {/* Copy place link */}
            <button
              type="button"
              onClick={() => copyToClipboard(place.url)}
              className="
                flex h-[40px] w-[40px]
                items-center justify-center
                rounded-full
                border border-sky-500
                text-sky-500
                hover:bg-gray-300
              "
            >
              <LinkIcon />
            </button>
          </div>
        </div>
  
        {/* Fullscreen image preview overlay */}
        {previewIndex !== null && (
          <div
            onClick={() => setPreviewIndex(null)}
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/70
            "
          >
            {/* Active preview image */}
            <img
              src={images[previewIndex]}
              alt="preview"
              onClick={(e) => e.stopPropagation()}
              className="
                max-h-[90vh]
                max-w-[90vw]
                rounded-xl
                object-contain
              "
            />
  
            {/* Navigate to previous image */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewIndex((prev) =>
                    prev > 0 ? prev - 1 : images.length - 1
                  );
                }}
                className="
                  absolute left-6
                  text-4xl text-white
                  hover:opacity-80
                "
              >
                <ArrowBigLeftDash />
              </button>
            )}
  
            {/* Navigate to next image */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewIndex((prev) =>
                    prev < images.length - 1 ? prev + 1 : 0
                  );
                }}
                className="
                  absolute right-6
                  text-4xl text-white
                  hover:opacity-80
                "
              >
                <ArrowBigRightDash />
              </button>
            )}
  
            {/* Close preview overlay */}
            <button
              type="button"
              onClick={() => setPreviewIndex(null)}
              className="
                absolute right-6 top-6
                text-3xl text-white
                hover:opacity-80
              "
            >
              ✕
            </button>
          </div>
        )}
      </article>
    );
  }
  
  export default PlaceCard;
