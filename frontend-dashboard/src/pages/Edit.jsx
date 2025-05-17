import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProjektContext } from "../ProjektContext";
import { updateProjekt } from "../services/projektAPI";

function Edit() {
  const { projektnummer } = useParams();
  const navigate = useNavigate();
  const { projekte, setProjekte } = useContext(ProjektContext);

  const projekt = projekte.find(p => p.projektNummer === projektnummer);

  const [dauerVon, setDauerVon] = useState(projekt?.dauerVon || "");
  const [dauerBis, setDauerBis] = useState(projekt?.dauerBis || "");
  const [achsBezeichnung, setAchsBezeichnung] = useState(projekt?.achsBezeichnung || "");
  const [status, setStatus] = useState(projekt?.status || "");

  if (!projekt) {
    return <div>Projekt nicht gefunden.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProjekt = {
      ...projekt,
      dauerVon,
      dauerBis,
      achsBezeichnung,
      status
    };

    try {
      const result = await updateProjekt(projekt.projektNummer, updatedProjekt);

      const updatedProjekte = projekte.map(p =>
        p.projektNummer === projekt.projektNummer ? result : p
      );
      setProjekte(updatedProjekte);

      navigate(`/details/${projekt.projektNummer}`);
    } catch (error) {
      console.error('Fehler beim Update:', error);
      alert('Das Projekt konnte nicht aktualisiert werden.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Projekt bearbeiten: {projekt.projektNummer}</h2>

      <label>Von:</label>
      <input
        type="date"
        value={dauerVon?.slice(0, 10)}
        onChange={(e) => setDauerVon(e.target.value)}
      />

      <label>Bis:</label>
      <input
        type="date"
        value={dauerBis?.slice(0, 10)}
        onChange={(e) => setDauerBis(e.target.value)}
      />

      <label>Achsbezeichnung:</label>
      <input
        type="text"
        value={achsBezeichnung}
        onChange={(e) => setAchsBezeichnung(e.target.value)}
      />

      <label>Status:</label>
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <button type="submit">Speichern</button>
    </form>
  );
}

export default Edit;