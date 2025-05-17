import { createContext, useEffect, useState } from 'react';

export const ProjektContext = createContext();

export function ProjektProvider({ children }) {
  const [projekte, setProjekte] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/baustellen')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        setProjekte(data.projekte);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <ProjektContext.Provider value={{ projekte, setProjekte }}>
      {children}
    </ProjektContext.Provider>
  );
}

// GET
// localhost:8080/api/baustellen

// PUT und GET 
// localhost:8080/api/baustellen/:id