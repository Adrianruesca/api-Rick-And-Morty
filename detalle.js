document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const characterId = params.get("id");

  if (characterId) {
    fetchCharacterDetails(characterId);
  } else {
    document.getElementById("characterDetails").innerText =
      "No se encontró el ID del personaje.";
  }
});

function fetchCharacterDetails(id) {
  const url = `https://rickandmortyapi.com/api/character/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayCharacterDetails(data);
    })
    .catch((error) => {
      console.error("Error detalles del personaje en la api:", error);
      document.getElementById("characterDetails").innerText =
        "Error cargando los detalles del personaje.";
    });
}

function displayCharacterDetails(character) {
  const characterDetails = document.getElementById("characterDetails");
  characterDetails.innerHTML = "";

  const characterCard = document.createElement("div");
  characterCard.classList.add("character-card");

  const characterImage = document.createElement("img");
  characterImage.src = character.image;
  characterImage.alt = character.name;

  const characterInfo = document.createElement("div");
  characterInfo.classList.add("character-info");

  const characterName = document.createElement("h2");
  characterName.innerText = character.name;

  const characterStatus = document.createElement("p");
  characterStatus.innerText = `Estado: ${character.status}`;

  const characterSpecies = document.createElement("p");
  characterSpecies.innerText = `Especie: ${character.species}`;

  const characterGender = document.createElement("p");
  characterGender.innerText = `Género: ${character.gender}`;

  const characterOrigin = document.createElement("p");
  characterOrigin.innerText = `Origen: ${character.origin.name}`;

  characterInfo.appendChild(characterName);
  characterInfo.appendChild(characterStatus);
  characterInfo.appendChild(characterSpecies);
  characterInfo.appendChild(characterGender);
  characterInfo.appendChild(characterOrigin);

  characterCard.appendChild(characterImage);
  characterCard.appendChild(characterInfo);

  characterDetails.appendChild(characterCard);
}
