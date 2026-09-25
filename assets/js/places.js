// Activity 4: Places Travelled
// When a place card is clicked, point the embedded Google map at that place.

const mapFrame = document.getElementById("places-map");
const mapLabel = document.getElementById("map-label");
const placeCards = document.querySelectorAll(".place-card");

function showPlace(card) {
  // Read the data-* attributes from the clicked card
  const query = card.dataset.query;
  const zoom = card.dataset.zoom;

  // Build the Google Maps embed URL and load it into the iframe
  mapFrame.src = "https://www.google.com/maps?q=" + encodeURIComponent(query) +
    "&z=" + zoom + "&output=embed";
  mapLabel.textContent = card.dataset.name;

  // Highlight only the selected card
  placeCards.forEach(function (c) {
    c.classList.remove("active");
    c.setAttribute("aria-pressed", "false");
  });
  card.classList.add("active");
  card.setAttribute("aria-pressed", "true");
}

placeCards.forEach(function (card) {
  card.addEventListener("click", function () {
    showPlace(card);
  });
});

// Count the cards so the stats stay right when a place is added
const continents = new Set();
placeCards.forEach(function (card) {
  continents.add(card.dataset.continent);
});
document.getElementById("country-count").textContent = placeCards.length;
document.getElementById("continent-count").textContent = continents.size;
