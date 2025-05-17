import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProjektContext } from "../ProjektContext";
import { Link } from "react-router-dom";
import OSMMapWithPolygon from "../services/ OSMMapWithPolygon";

function Detail() {
  const { projektnummer } = useParams();
  const { projekte } = useContext(ProjektContext);

  // Projekt mit passender Nummer finden (nicht mehr features)
  const projekt = projekte.find(p => p.projektNummer === projektnummer);

  if (!projekt) {
    return <div>Projekt nicht gefunden.</div>;
  }

  return (
    <div className="projekt-detail">
      <h1>Projekt {projekt.projektNummer}</h1>

      {projekt.untertitel && <h2>{projekt.untertitel}</h2>}

      <Link to={`/edit/${projekt.projektNummer}`}>
        <button>Bearbeiten</button>
      </Link>

      <p><strong>Status:</strong> {projekt.status}</p>
      <p><strong>Achsbezeichnung:</strong> {projekt.achsBezeichnung}</p>

      <p><strong>Dauer:</strong> {new Date(projekt.dauerVon).toLocaleDateString()} – {new Date(projekt.dauerBis).toLocaleDateString()}</p>

      {/* Optional: Objektangaben anzeigen, falls vorhanden */}
      {projekt.objektAngaben && (
        <div>
          <strong>Objektangaben:</strong>
          <pre>{JSON.stringify(projekt.objektAngaben, null, 2)}</pre>
        </div>
      )}
          <OSMMapWithPolygon data={projekt.geoJsonData} />
      )
    </div>
  );
}

export default Detail;