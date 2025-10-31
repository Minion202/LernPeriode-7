(() => {
  const timeEl = document.getElementById("k-time");
  const startBtn = document.getElementById("k-start");
  const resetBtn = document.getElementById("k-reset");
  const select = document.getElementById("k-select");
  const statusEl = document.getElementById("k-status");

  let mode = "work";
  let isRunning = false;
  let timeLeft = Number(select.value) * 60;
  let timer = null;

  const fmt = s => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  function updateUI() {
    timeEl.textContent = fmt(timeLeft);
    startBtn.textContent = isRunning ? "Pause" : "Start";
    statusEl.textContent = mode === "work" ? "Work Time" : "Break Time";
  }

  function tick() {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      if (mode === "work") {
        mode = "break";
        timeLeft = 5 * 60;
        isRunning = true;
        timer = setInterval(tick, 1000);
      } else {
        mode = "work";
        timeLeft = Number(select.value) * 60;
        isRunning = false;
      }
      updateUI();
    } else {
      updateUI();
    }
  }

  startBtn.addEventListener("click", () => {
    if (isRunning) {
      clearInterval(timer);
      timer = null;
      isRunning = false;
    } else {
      if (!timer) timer = setInterval(tick, 1000);
      isRunning = true;
    }
    updateUI();
  });

  resetBtn.addEventListener("click", () => {
    isRunning = false;
    clearInterval(timer);
    timer = null;
    timeLeft = (mode === "work" ? Number(select.value) * 60 : 5 * 60);
    updateUI();
  });

  select.addEventListener("change", () => {
    if (!isRunning && mode === "work") {
      timeLeft = Number(select.value) * 60;
      updateUI();
    }
  });

  updateUI();
})();
