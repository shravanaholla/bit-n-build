const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
}
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  // Save theme preference
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
