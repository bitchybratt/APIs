const apiUrl = 'https://hp-api.onrender.com/api/characters';

const searchButton = document.getElementById('searchButton');
const houseInput = document.getElementById('houseInput');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
  const house = houseInput.value.toLowerCase();
  const houseUrl = `${apiUrl}/house/${house}`;

  fetch(houseUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      resultsDiv.innerHTML = ''; // Limpia los resultados anteriores
      if (data.length > 0) {
        const houseTitle = document.createElement('h2');
        houseTitle.textContent = `Personajes en la casa ${house}:`;
        resultsDiv.appendChild(houseTitle);
        const characterList = document.createElement('ul');
        data.forEach(character => {
          const characterItem = document.createElement('li');
          characterItem.textContent = character.name;
          characterList.appendChild(characterItem);
        });
        resultsDiv.appendChild(characterList);
      } else {
        resultsDiv.textContent = `No se encontraron personajes en la casa ${house}.`;
      }
    })
    .catch(error => {
      resultsDiv.textContent = `Error al obtener datos de la API: ${error}`;
    });
});
