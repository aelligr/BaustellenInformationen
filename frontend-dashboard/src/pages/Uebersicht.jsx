import { ProjektContext } from "../ProjektContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Uebersicht({ handleEdit }) {
  const { projekte } = useContext(ProjektContext);

  return (
    <div className="projekt-list">
      <h2>Übersicht Baustelleninformationen</h2>

      {projekte.map((projekt, projIndex) => (
        <div key={projIndex}>
          {projekt.features.map((feature, featIndex) => (
            <div className="projekt-preview" key={featIndex}>
              <h2>{feature.titel}</h2>
              <h3>{feature.untertitel}</h3>
              <p>
                <strong>Dauer:</strong>{" "}
                {new Date(feature.dauer.von).toLocaleString()} bis{" "}
                {new Date(feature.dauer.bis).toLocaleString()}
              </p>
              <Link to={`/details/${feature.projektnummer}`}>
                Zur Detailansicht
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Uebersicht;