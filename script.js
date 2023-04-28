const ip = document.getElementById("ip");
const locationn = document.getElementById("location");
const isp = document.getElementById("isp");
const timezone = document.getElementById("timezone");
const searchBtn = document.getElementById("button-search");
const inputBtn = document.getElementById("input-search");

const map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function makeFieldesEmpty() {
  ip.innerHTML = "";
  locationn.innerHTML = "";
  isp.innerHTML = "";
  timezone.innerHTML = "";

  inputBtn.value = "";
}

function loadData(data) {
  ip.innerHTML = data.ip;
  locationn.innerHTML = data.location.region + ", " + data.location.country;
  timezone.innerHTML = "UTC " + data.location.timezone;
  isp.innerHTML = data.isp;
}

function getData(ipAddress) {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_C7Ceu5WA0germb0THhC27uLgyF5EQ&ipAddress=${ipAddress}`
  )
    .then((response) => response.json())
    .then((data) => {
      makeFieldesEmpty();
      loadData(data);
      setMarker(data.location.lat, data.location.lng);
    });
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getData(inputBtn.value);
});

function setMarker(lat, lng) {
  map.setView([lat, lng], 13);
  L.marker([lat, lng]).addTo(map);
}
