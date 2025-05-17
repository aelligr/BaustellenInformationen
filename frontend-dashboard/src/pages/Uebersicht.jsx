

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
            <h2>{projekt.titel}</h2>
            <h3>{projekt.untertitel}</h3>
            <p><strong>Dauer:</strong> {new Date(projekt.dauer.von).toLocaleString()} bis {new Date(projekt.dauer.bis).toLocaleString()}</p>
            <Link to={`/details/${projekt.projektnummer}`}>
              Zur Detailansicht
          </Link>
          </div>
        ))}
      </div>
  );
}

export default Uebersicht;