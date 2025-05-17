import OSMMapWithAllPolygon from "../services/ OSMMapWithAllPolygon";
import { ProjektContext } from "../ProjektContext";
import { useContext } from "react";

function Home() {
  const { projekte } = useContext(ProjektContext);

  return (
    <>
      <h2>Kanton Bern baut - wir zeigen wo!</h2>
      <OSMMapWithAllPolygon projekte={projekte} />
    </>
  );
}

export default Home;