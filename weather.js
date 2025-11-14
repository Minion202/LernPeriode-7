const WX_URL = "https://api.open-meteo.com/v1/forecast";

const WX_PARAMS = new URLSearchParams({
  latitude: "47.37",
  longitude: "8.55",
  hourly: "temperature_2m,precipitation,weathercode",
  models: "meteoswiss_icon_ch1",
  timezone: "Europe/Zurich"
});

async function loadWX() {
  const res = await fetch(`${WX_URL}?${WX_PARAMS}`);
  const data = await res.json();

  const times = data.hourly.time;
  const temps = data.hourly.temperature_2m;
  const precip = data.hourly.precipitation;
  const codes = data.hourly.weathercode;

  const now = new Date();
  let idx = times.findIndex(t => new Date(t) >= now);
  if (idx === -1) idx = 0;

  const temp = temps[idx];
  const rain = precip[idx];
  const code = codes[idx];

  // icons
  const sun   = document.getElementById("wx-sun");
  const cloud = document.getElementById("wx-cloud");
  const rainI = document.getElementById("wx-rain");

  sun.style.display = "none";
  cloud.style.display = "none";
  rainI.style.display = "none";

  const rainCodes = [51,53,55,61,63,65,80,81,82,85,86];

  if (rain > 0.1 || rainCodes.includes(code)) {
    rainI.style.display = "block";
    document.getElementById("wx-text").textContent = "Regen";
  } else if (temp >= 20 && (code === 0 || code === 1)) {
    sun.style.display = "block";
    document.getElementById("wx-text").textContent = "Sonnig";
  } else {
    cloud.style.display = "block";
    document.getElementById("wx-text").textContent = "Bewölkt";
  }

  document.getElementById("wx-temp").textContent = temp.toFixed(1) + " °C";
}

loadWX();
