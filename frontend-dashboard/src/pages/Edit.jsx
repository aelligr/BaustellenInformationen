import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProjektContext } from "../ProjektContext";
import { updateProjekt } from "../services/projektAPI";

function Edit() {
  const { projektnummer } = useParams();
  const navigate = useNavigate();
  const { projekte, setProjekte } = useContext(ProjektContext);

  const projekt = projekte.find(p => p.projektnummer === projektnummer);

  const [von, setVon] = useState(projekt?.dauer.von || "");
  const [bis, setBis] = useState(projekt?.dauer.bis || "");
  const [teilstrecke, setTeilstrecke] = useState(projekt?.teilstrecke || "");
  const [verkehr, setVerkehr] = useState(projekt?.verkehrsfuehrung || []);

  if (!projekt) {
    return <div>Projekt nicht gefunden.</div>;
  }

  const handleVerkehrChange = (index, value) => {
    const newVerkehr = [...verkehr];
    newVerkehr[index] = value;
    setVerkehr(newVerkehr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedProjekt = {
      ...projekt,
      dauer: { von, bis },
      teilstrecke,
      verkehrsfuehrung: verkehr
    };
  
    try {
      const result = await updateProjekt(projektnummer, updatedProjekt);
  
      const updatedProjekte = projekte.map(p =>
        p.projektnummer === projektnummer ? result : p
      );
      setProjekte(updatedProjekte);
  
      navigate(`/details/${projektnummer}`);
    } catch (error) {
      console.error('Fehler beim Update:', error);
      alert('Das Projekt konnte nicht aktualisiert werden.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Projekt bearbeiten: {projekt.titel}</h2>

      <label>Von:</label>
      <input type="datetime-local" value={von} onChange={(e) => setVon(e.target.value)} />

      <label>Bis:</label>
      <input type="datetime-local" value={bis} onChange={(e) => setBis(e.target.value)} />

      <label>Strecke:</label>
      <input type="text" value={teilstrecke} onChange={(e) => setTeilstrecke(e.target.value)} />

      <label>Verkehrsführung:</label>
      {verkehr.map((v, i) => (
        <input
          key={i}
          type="text"
          value={v}
          onChange={(e) => handleVerkehrChange(i, e.target.value)}
        />
      ))}

      <button type="submit">Speichern</button>
    </form>
  );
}

export default Edit;