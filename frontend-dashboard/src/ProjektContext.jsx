import { createContext, useEffect, useState } from 'react';

export const ProjektContext = createContext();

export function ProjektProvider({ children }) {
  const [projekte, setProjekte] = useState([]);

  useEffect(() => {
    fetch('/data.json')  
      .then((res) => res.json())
      .then((data) => setProjekte(data.projekte))
      .catch((err) => console.error('Fehler beim Laden der Daten:', err));
  }, []);

  return (
    <ProjektContext.Provider value={{ projekte, setProjekte }}>
      {children}
    </ProjektContext.Provider>
  );
}
