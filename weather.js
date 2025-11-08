// weather.js
// Holt Wetterdaten von Open-Meteo (Modell: meteoswiss_icon_ch1) für Zürich

const API_URL = "https://api.open-meteo.com/v1/forecast";
const params = new URLSearchParams({
  latitude: "47.37",
  longitude: "8.55",
  hourly: "temperature_2m",
  models: "meteoswiss_icon_ch1",
  timezone: "Europe/Zurich"
});

async function getHourlyTemps() {
  const url = `${API_URL}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

  const data = await res.json();

  const times = data?.hourly?.time || [];
  const temps = data?.hourly?.temperature_2m || [];

  if (!times.length || !temps.length) throw new Error("Keine Wetterdaten gefunden");

  // Nimm die nächsten 24 Stunden ab jetzt
  const now = new Date();
  const startIdx = times.findIndex(t => new Date(t) >= now);
  const from = startIdx >= 0 ? startIdx : 0;
  const sliceTimes = times.slice(from, from + 24);
  const sliceTemps = temps.slice(from, from + 24);

  // Gib sie als Array von Objekten zurück
  return sliceTimes.map((t, i) => ({
    time: new Date(t).toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    temp: sliceTemps[i].toFixed(1)
  }));
}

// Ausgabe in das HTML-Element
getHourlyTemps()
  .then((entries) => {
    const out = document.getElementById("weather-output");
    out.innerHTML = entries
      .map(
        (e) =>
          `<div class="temp-row"><span>${e.time}</span><span>${e.temp}°C</span></div>`
      )
      .join("");
  })
  .catch((err) => {
    document.getElementById("weather-output").textContent =
      "Fehler beim Laden: " + err.message;
  });
