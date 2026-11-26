// components/AddressCredit.jsx
//
// Attribution for address suggestions from OpenStreetMap (Nominatim).
// OSM data is © OpenStreetMap contributors under the Open Database
// License; the copyright page explains the licence and how to credit it.

export const OSM_COPYRIGHT_URL = "https://www.openstreetmap.org/copyright";

export default function AddressCredit() {
  return (
    <p className="mt-2 font-body text-[11px] leading-snug text-ink/50">
      <a href={OSM_COPYRIGHT_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink/70">
        Address data © OpenStreetMap contributors
      </a>
    </p>
  );
}
