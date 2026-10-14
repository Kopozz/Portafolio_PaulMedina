// Runs before first paint: enables JS-only animation styles, and reveals everything
// if the main script fails to start so content is never left hidden.
(function () {
    var root = document.documentElement;
    root.classList.replace("no-js", "js");
    window.setTimeout(function () {
        if (!window.__kzReady) root.classList.add("is-loaded", "reveal-all");
    }, 3000);
})();
