// Runs before the page renders, so there is no flash of the wrong theme.
// A choice made with the toggle (ThemeToggle.tsx) wins; otherwise the device setting.
(function () {
  var theme = null;
  try {
    theme = localStorage.getItem('theme');
  } catch (e) {
    // Storage blocked (private mode): fall back to the device setting
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
})();
