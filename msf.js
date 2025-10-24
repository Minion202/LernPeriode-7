function addTask(taskText) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", updateProgress);

  const textSpan = document.createElement("span");
  textSpan.textContent = taskText;
  textSpan.className = "taskText";

  const removeBtn = document.createElement("button");
  const removeIcon = document.createElement("img");
  removeBtn.style.backgroundColor = "transparent";
  removeBtn.style.borderStyle = "none";
  removeIcon.src = "Cross.png"; // <-- dein Bildname hier!
  removeIcon.style.width = "20px";
  removeIcon.style.height = "20px";
  removeIcon.style.filter = "invert(1)"; // weiß auf dunklem Hintergrund sichtbar
  removeBtn.appendChild(removeIcon);

  removeBtn.addEventListener("click", () => {
    task.remove();
    updateProgress();
  });

  const task = document.createElement("div");
  task.className = "task";
  task.appendChild(checkbox);
  task.appendChild(textSpan);
  task.appendChild(removeBtn);

  const tasks = document.getElementById("tasks");
  tasks.appendChild(task);

  const newTask = document.getElementById("newTask");
  newTask.value = "";

  updateProgress();
}

function updateProgress() {
  const track = document.querySelector(".progress-track");
  const fill = document.querySelector(".progress-fill");
  const label = document.getElementById("progress-label");

  const boxes = document.querySelectorAll(".task input[type='checkbox']");
  const checked = Array.from(boxes).filter(cb => cb.checked).length;
  const total = boxes.length;

  const pct = total === 0 ? 0 : Math.round((checked / total) * 100);

  fill.style.width = `${pct}%`;
  fill.setAttribute("aria-valuenow", String(pct));
  label.textContent = `${checked} / ${total} tasks done`;

  track.classList.toggle("is-empty", pct === 0);
  fill.classList.toggle("is-complete", pct === 100);
}
