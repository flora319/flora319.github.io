// Activity 6: Dark mode toggle
// The small script in <head> already set <html data-theme="light" or "dark">
// before the page appeared. This file keeps the button in sync and handles clicks.

const toggleBtn = document.getElementById("theme-toggle");
const toggleIcon = toggleBtn.querySelector("i");

// Apply a theme to the page and update the button to match
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.setAttribute("data-theme", theme);

  // Show the icon of the mode you would switch TO: sun in dark mode, moon in light mode
  toggleIcon.className = isDark ? "fa fa-sun-o" : "fa fa-moon-o";
  toggleBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

// Sync the button with whatever theme the <head> script chose
applyTheme(document.documentElement.getAttribute("data-theme") || "light");

toggleBtn.addEventListener("click", function () {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);

  // Remember the choice for the next visit
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    // Storage can be blocked (e.g. strict private browsing); the toggle still works for now
  }
});
