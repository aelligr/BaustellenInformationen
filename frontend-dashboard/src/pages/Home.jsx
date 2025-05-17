import OSMMapWithAllPolygon from "../services/ OSMMapWithAllPolygon";
import { ProjektContext } from "../ProjektContext";
import { useContext } from "react";

function Home() {
  const { projekte } = useContext(ProjektContext);

  return (
    <>
      <h1>Aktuelle Baustellen informationen</h1>
      <OSMMapWithAllPolygon projekte={projekte} />
    </>
  );
}

export default Home;