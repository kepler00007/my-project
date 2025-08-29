document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const savedData = JSON.parse(localStorage.getItem("daycounter-data") || "{}");

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.className = "day";
    if (d === today.getDate()) cell.classList.add("today");
    cell.innerHTML = `<div>${d}</div>`;

    const key = `${year}-${month + 1}-${d}`;
    let count = savedData[key] || 0;

    if (d === today.getDate()) {
      const btn = document.createElement("button");
      btn.textContent = "Click Me";
      btn.onclick = () => {
        count++;
        savedData[key] = count;
        localStorage.setItem("daycounter-data", JSON.stringify(savedData));
        updateCounter();
      };
      cell.appendChild(btn);

      const counter = document.createElement("div");
      counter.className = "counter";
      counter.textContent = count > 0 ? count : "";
      cell.appendChild(counter);

      function updateCounter() {
        counter.textContent = count > 0 ? count : "";
      }
    } else {
      if (count > 0) {
        const counter = document.createElement("div");
        counter.className = "counter";
        counter.textContent = count;
        cell.appendChild(counter);
      }
    }
    calendar.appendChild(cell);
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
});
