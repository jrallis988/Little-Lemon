import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NEARBY, SITE, THINGS_TO_DO } from "../data";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker paths under CRA / webpack.
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Location() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return undefined;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
    }).setView([SITE.lat, SITE.lon], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    L.marker([SITE.lat, SITE.lon])
      .addTo(map)
      .bindPopup(
        `<strong>${SITE.name}</strong><br/>${SITE.addressShort}<br/>North Beach · Plaice Cove`
      )
      .openPopup();

    mapInstance.current = map;

    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    // Skip delayed invalidate in Jest — it keeps the worker alive after tests.
    const timer =
      process.env.NODE_ENV === "test"
        ? null
        : window.setTimeout(onResize, 300);

    return () => {
      if (timer != null) window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <section className="location section--wide" id="location" aria-labelledby="location-title">
      <div className="section__inner location__grid">
        <div>
          <p className="section__eyebrow">Location</p>
          <h2 className="section__title" id="location-title">
            Steps from North Beach in Hampton, NH.
          </h2>
          <p className="section__copy">
            {SITE.address}. {SITE.neighborhood}—a quieter stretch of Ocean
            Boulevard with the sand right across the street.
          </p>

          <ol className="location__directions">
            <li>Follow Ocean Boulevard north from Hampton Beach toward North Beach.</li>
            <li>Look for Seascape Inn at 955 Ocean Blvd in Plaice Cove.</li>
            <li>Park on site, then walk straight across to the beach path.</li>
          </ol>

          <ul className="location__nearby">
            {NEARBY.map((spot) => (
              <li key={spot.title}>
                <strong>{spot.title}</strong>
                <span>{spot.detail}</span>
              </li>
            ))}
          </ul>

          <div className="location__actions">
            <a
              className="btn btn-ocean"
              href={SITE.mapLink}
              target="_blank"
              rel="noreferrer"
            >
              Open map
            </a>
            <a className="btn btn-ghost" href={SITE.phoneHref}>
              Call for directions
            </a>
          </div>
        </div>

        <div className="location__map-panel">
          <p className="location__map-label">Find us on the map</p>
          <div
            className="location__map"
            ref={mapRef}
            role="region"
            aria-label="Interactive map of Seascape Inn in Hampton, New Hampshire"
          />
        </div>
      </div>

      <div className="section__inner location__explore" id="explore">
        <p className="section__eyebrow">Around Hampton</p>
        <h3 className="location__explore-title">Fun things to do nearby.</h3>
        <p className="section__copy">
          From the beach across the street to Portsmouth evenings and Rye Harbor
          days—easy outings from Plaice Cove.
        </p>

        <ul className="things-list">
          {THINGS_TO_DO.map((item) => (
            <li key={item.title}>
              <span className="things-list__when">{item.when}</span>
              <strong>{item.title}</strong>
              <span className="things-list__detail">{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
