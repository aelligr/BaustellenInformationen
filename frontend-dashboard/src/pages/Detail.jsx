import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProjektContext } from "../ProjektContext";
import { Link } from "react-router-dom";

function Detail() {
  const { projektnummer } = useParams();
  const { projekte } = useContext(ProjektContext);

  const projekt = projekte.find(p => p.projektnummer === projektnummer);

  if (!projekt) {
    return <div>Projekt nicht gefunden.</div>;
  }

  return (
    <div className="projekt-detail">
      <h1>{projekt.titel}</h1>
      <h2>{projekt.untertitel}</h2>
      <Link to={`/edit/${projekt.projektnummer}`}>
        <button>Bearbeiten</button>
      </Link>

      <p><strong>Projektnummer:</strong> {projekt.projektnummer}</p>
      <p><strong>Projektbezeichnung:</strong> {projekt.projektbezeichnung}</p>
      <p><strong>Teilstrecke:</strong> {projekt.teilstrecke}</p>
      <p><strong>Strassen-Nr:</strong> {projekt.strassenNr}</p>

      <p><strong>Dauer:</strong> {new Date(projekt.dauer.von).toLocaleString()} – {new Date(projekt.dauer.bis).toLocaleString()}</p>

      <p><strong>Ausnahmen:</strong> {projekt.ausnahmen}</p>

      <div>
        <strong>Verkehrsführung:</strong>
        <ul>
          {projekt.verkehrsfuehrung.map((punkt, i) => (
            <li key={i}>{punkt}</li>
          ))}
        </ul>
      </div>

      <p><strong>Einschränkungen:</strong> {projekt.einschraenkungen}</p>
      <p><strong>Grund der Maßnahme:</strong> {projekt.grundDerMassnahme}</p>

      <div>
        <strong>Verfügende Stelle:</strong>
        <p>{projekt.verfuegendeStelle.behoerde}</p>
        <p>{projekt.verfuegendeStelle.dienststelle}</p>
        <p>{projekt.verfuegendeStelle.adresse}, {projekt.verfuegendeStelle.plzOrt}</p>
      </div>

      <p><strong>Rechtliche Hinweise:</strong> {projekt.rechtlicheHinweise}</p>

      <div>
        <strong>Geokoordinaten:</strong>
        <p>Typ: {projekt.geometry.type}</p>
        <p>Koordinaten: Längengrad: {projekt.geometry.coordinates[0]}, Breitengrad: {projekt.geometry.coordinates[1]}</p>
      </div>
    </div>
  );
}

export default Detail;