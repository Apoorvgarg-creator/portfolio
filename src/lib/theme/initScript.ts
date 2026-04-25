// Pre-paint script that reads localStorage and sets data-theme/data-season on <html>
// before React hydrates, eliminating the flash-of-wrong-theme on reload.
// First-time visitors with no stored preference default to seasonal/summer.
// Kept as a string so it can be injected via <Script> in the server layout.
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var raw = localStorage.getItem('theme-v1');
    var mode = 'seasonal';
    var season = 'summer';
    if (raw) {
      var t = JSON.parse(raw);
      mode = t && t.mode === 'terminal' ? 'terminal' : 'seasonal';
      var seasons = ['winter','spring','summer','autumn','all'];
      if (t && seasons.indexOf(t.season) !== -1) season = t.season;
    }
    var d = document.documentElement;
    if (mode === 'seasonal') {
      d.setAttribute('data-theme', 'seasonal');
      d.setAttribute('data-season', season);
    } else {
      d.removeAttribute('data-theme');
      d.removeAttribute('data-season');
    }
  } catch (e) {}
})();
`.trim();
