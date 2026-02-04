const themeBtn = document.getElementById("themeBtn");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

function setTheme(mode) {
  document.body.classList.toggle("light", mode === "light");
  localStorage.setItem("theme", mode);
}

const saved = localStorage.getItem("theme");
if (saved) setTheme(saved);

themeBtn.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});
