document.addEventListener("DOMContentLoaded", function () {
  // Function pour ecrir le text am peu am peu/dsl pour le faute ortograpge et le melange de ESP/FR :)
  function escribirTexto(elemento, textoCompleto, indice) {
    if (indice < textoCompleto.length) {
      elemento.textContent += textoCompleto[indice];
      indice++;
      setTimeout(function () {
        escribirTexto(elemento, textoCompleto, indice);
      }, 100);
    }
  }

  // obtien le parragraf que il sont <p>
  var parrafos = document.querySelectorAll(
    "#contenido-especifico p, #nueva-seccion p"
  );

  parrafos.forEach(function (parrafo) {
    var textoCompleto = parrafo.textContent;
    parrafo.textContent = "";
    escribirTexto(parrafo, textoCompleto, 0);
  });

  // Animaction en utilison la library de anime.js
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

  // Toggle pour montre/oculter le menu en dispisitive movile
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("show");
  });
});
