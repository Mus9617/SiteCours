document.addEventListener("DOMContentLoaded", function () {
  var tituloBienvenida = document.getElementById("bienvenida-titulo");
  var textoCompleto = tituloBienvenida.textContent;
  var indice = 0;

  function escribirTexto() {
    tituloBienvenida.textContent += textoCompleto[indice];
    indice++;

    if (indice < textoCompleto.length) {
      setTimeout(escribirTexto, 100);
    }
  }

  // ca il faite que quand la page il charge commence l'animation
  tituloBienvenida.textContent = "";
  escribirTexto();

  // animation pour explore mes travaille avec un effet differant et plus tardiv
  var seccionExploraTrabajos = document.getElementById(
    "seccion-explora-trabajos"
  );
  anime({
    targets: seccionExploraTrabajos,
    translateY: [50, 0], // deplacement vertical
    opacity: [0, 1],
    color: "#F8F8F8", // couleur violet obsucre
    easing: "easeInOutQuad",
    duration: 1500,
    delay: 1000, // plus tardif au moment de charge la page
  });

  // Togle pour montre le menu en mobile
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("show");
  });
});
