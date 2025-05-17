import { ProjektContext } from "../ProjektContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Uebersicht({ handleEdit }) {
  const { projekte, setProjekte } = useContext(ProjektContext);

  return (
    <div className="projekt-list">
      <h2>Übersicht Baustelleninformationen</h2>
      {projekte.map((projekt, index) => (
        <div className="projekt-preview" key={index}>
          <h2>{projekt.projektNummer}</h2>

          {projekt.projektbezeichnung && <h3>{projekt.projektbezeichnung}</h3>}

          <p><strong>Dauer:</strong> {new Date(projekt.dauerVon).toLocaleDateString()} bis {new Date(projekt.dauerBis).toLocaleDateString()}</p>

          <p><strong>Achsbezeichnung:</strong> {projekt.achsBezeichnung}</p>
          <p><strong>Status:</strong> {projekt.status}</p>

          <Link to={`/details/${projekt.projektNummer}`}>
            Zur Detailansicht
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Uebersicht;