// Animaction en utilison la library de anime.js
var seccionExploraTrabajos = document.getElementById(
  "seccion-explora-trabajos"
);

// Toggle pour montre/oculter le menu en dispisitive movile
var menuToggle = document.getElementById("menu-toggle");
var mobileMenu = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
  mobileMenu.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", function () {
  var moments = document.querySelectorAll(".moment");
  moments.forEach(function (moment, index) {
    moment.style.opacity = 0;
    moment.style.animation =
      "fadeIn 1s ease-in-out " + (index + 1) * 0.5 + "s forwards";
  });
});
