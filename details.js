document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get('id');

    fetch(`https://valorant-api.com/v1/agents/${characterId}`)
        .then(response => response.json())
        .then(data => displayCharacterDetails(data.data))
        .catch(error => console.error('Error fetching data:', error));
});

function displayCharacterDetails(character) {
    const container = document.getElementById('characterDetails');
    const details = document.createElement('div');
    details.className = 'card';
    details.innerHTML = `
        <img src="${character.displayIcon}" alt="${character.displayName}">
        <h3>${character.displayName}</h3>
        <p>${character.description}</p>
        <p><strong>Role:</strong> ${character.role.displayName}</p>
    `;
    container.appendChild(details);
}
