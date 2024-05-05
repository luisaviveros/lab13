document.addEventListener('DOMContentLoaded', function() {
    fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
        .then(response => response.json())
        .then(data => displayCharacters(data.data))
        .catch(error => console.error('Error fetching data:', error));
});

function displayCharacters(characters) {
    const container = document.getElementById('characters');
    container.innerHTML = ''; // Limpiar las tarjetas existentes cada vez que se refresca la lista
    characters.forEach(character => {
        if (character.isPlayableCharacter) {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = character.uuid; // Asignar el UUID como ID del div
            card.innerHTML = `
                <img src="${character.displayIcon}" alt="${character.displayName}">
                <h3>${character.displayName}</h3>
                <p>${character.description}</p>
                <button onclick="location.href='details.html?id=${character.uuid}'">Ver información detallada</button>
                <button onclick="removeCharacter('${character.uuid}')" style="background-color: red; margin-top: 10px;">Eliminar</button>
            `;
            container.appendChild(card);
        }
    });
}

function filterCharacters() {
    const searchQuery = document.getElementById('searchBox').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        if (name.includes(searchQuery)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function removeCharacter(uuid) {
    const cardToRemove = document.getElementById(uuid);
    if (cardToRemove) {
        cardToRemove.remove();
    }
}
