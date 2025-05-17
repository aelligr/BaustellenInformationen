import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProjektContext } from "../ProjektContext";
import { Link } from "react-router-dom";
import OSMMapWithPolygon from "../services/ OSMMapWithPolygon";

function Detail() {
  const { projektnummer } = useParams();
  const { projekte } = useContext(ProjektContext);

  // Feature aus verschachtelter Struktur extrahieren
  let feature = null;
  for (const projekt of projekte) {
    feature = projekt.features.find(f => f.projektnummer === projektnummer);
    if (feature) break;
  }

  if (!feature) {
    return <div>Projekt nicht gefunden.</div>;
  }

  return (
    <div className="projekt-detail">
      <h1>{feature.titel}</h1>
      <h2>{feature.untertitel}</h2>

      <Link to={`/edit/${feature.projektnummer}`}>
        <button>Bearbeiten</button>
      </Link>

      <p><strong>Projektnummer:</strong> {feature.projektnummer}</p>
      <p><strong>Projektbezeichnung:</strong> {feature.projektbezeichnung}</p>
      <p><strong>Teilstrecke:</strong> {feature.teilstrecke}</p>
      <p><strong>Strassen-Nr:</strong> {feature.strassenNr}</p>

      <p><strong>Dauer:</strong> {new Date(feature.dauer.von).toLocaleString()} – {new Date(feature.dauer.bis).toLocaleString()}</p>
      <p><strong>Ausnahmen:</strong> {feature.ausnahmen}</p>

      <div>
        <strong>Verkehrsführung:</strong>
        <ul>
          {feature.verkehrsfuehrung.map((punkt, i) => (
            <li key={i}>{punkt}</li>
          ))}
        </ul>
      </div>

      <p><strong>Einschränkungen:</strong> {feature.einschraenkungen}</p>
      <p><strong>Grund der Maßnahme:</strong> {feature.grundDerMassnahme}</p>

      <div>
        <strong>Verfügende Stelle:</strong>
        <p>{feature.verfuegendeStelle.behoerde}</p>
        <p>{feature.verfuegendeStelle.dienststelle}</p>
        <p>{feature.verfuegendeStelle.adresse}, {feature.verfuegendeStelle.plzOrt}</p>
      </div>

      <p><strong>Rechtliche Hinweise:</strong> {feature.rechtlicheHinweise}</p>

      <div>
        <strong>Geokoordinaten:</strong>
        <p>Typ: {feature.geometry.type}</p>
        <p>
          Koordinaten: <br />
          {feature.geometry.coordinates.map((coord, i) => (
            <span key={i}>Lon: {coord[0]}, Lat: {coord[1]}<br /></span>
          ))}
        </p>
      </div>

      <OSMMapWithPolygon data={feature} />
    </div>
  );
}

export default Detail;