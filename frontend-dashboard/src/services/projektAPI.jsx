export async function updateProjekt(projektnummer, updatedProjekt) {
    const response = await fetch(`http://localhost:3000/projekte/${projektnummer}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProjekt)
    });
  
    if (!response.ok) {
      throw new Error('Update fehlgeschlagen');
    }
  
    return await response.json(); // Aktualisiertes Projekt zurückgeben
  }