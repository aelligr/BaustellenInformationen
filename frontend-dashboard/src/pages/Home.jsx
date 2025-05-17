import OSMMapWithAllPolygon from "../services/ OSMMapWithAllPolygon";
import { ProjektContext } from "../ProjektContext";
import { useContext } from "react";

function Home() {
  const { projekte } = useContext(ProjektContext);

  const allFeatures = projekte.flatMap(p => p.features ?? []);

  return (
    <>
      <h1>Willkommen auf der Startseite!</h1>
      <OSMMapWithAllPolygon features={allFeatures} />
    </>
  );
}

export default Home;