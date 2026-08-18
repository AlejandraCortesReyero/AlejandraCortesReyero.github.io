/* =========================================================
   ALEJANDRA PORTFOLIO — MOBILE BEHAVIOUR
   Cargar DESPUÉS de script.js.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const mobileQuery = window.matchMedia("(max-width: 650px)");
  const aboutInfoPanel = document.getElementById("aboutInfoPanel");
  const aboutObjects = document.querySelectorAll(".about-object");

  aboutObjects.forEach((object) => {
    object.addEventListener("click", () => {
      if (!mobileQuery.matches || !aboutInfoPanel) return;

      window.setTimeout(() => {
        const panelTop = aboutInfoPanel.getBoundingClientRect().top;

        if (panelTop > window.innerHeight * 0.58) {
          aboutInfoPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }, 240);
    });
  });
});