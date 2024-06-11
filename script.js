document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  document
    .getElementById("searchBar")
    .addEventListener("input", filterCharacters);
  document
    .getElementById("firstPageButton")
    .addEventListener("click", () => changePage(1));
  document
    .getElementById("prevPageButton")
    .addEventListener("click", () => changePage(currentPage - 1));
  document
    .getElementById("nextPageButton")
    .addEventListener("click", () => changePage(currentPage + 1));
  document
    .getElementById("lastPageButton")
    .addEventListener("click", () => changePage(totalPages));
});

let allCharacters = [];
let currentPage = 1;
let totalPages = 1;

function fetchData(page = 1) {
  const apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      allCharacters = data.results;
      totalPages = data.info.pages;
      displayData(allCharacters);
      updatePagination();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("dataContainer").innerText =
        "Error cargando los datos.";
    });
}

function displayData(characters) {
  const dataContainer = document.getElementById("dataContainer");
  dataContainer.innerHTML = "";

  characters.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.classList.add("character-card");
    characterCard.addEventListener("click", () => {
      window.location.href = `detalle.html?id=${character.id}`;
    });

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

    characterInfo.appendChild(characterName);
    characterInfo.appendChild(characterStatus);
    characterInfo.appendChild(characterSpecies);

    characterCard.appendChild(characterImage);
    characterCard.appendChild(characterInfo);

    dataContainer.appendChild(characterCard);
  });
}

function filterCharacters() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const filteredCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm)
  );
  displayData(filteredCharacters);
}

function changePage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    fetchData(currentPage);
  }
}

function updatePagination() {
  const pageList = document.getElementById("pageList");
  pageList.innerHTML = "";

  const pageRange = 3;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - pageRange && i <= currentPage + pageRange)
    ) {
      const pageItem = document.createElement("li");
      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.innerText = i;
      pageLink.addEventListener("click", (e) => {
        e.preventDefault();
        changePage(i);
      });

      if (i === currentPage) {
        pageLink.style.backgroundColor = "#FF0000";
      }

      pageItem.appendChild(pageLink);
      pageList.appendChild(pageItem);
    } else if (
      (i === currentPage - pageRange - 1 && currentPage > pageRange + 2) ||
      (i === currentPage + pageRange + 1 &&
        currentPage < totalPages - pageRange - 1)
    ) {
      const ellipsis = document.createElement("li");
      ellipsis.innerText = "...";
      pageList.appendChild(ellipsis);
    }
  }
}
