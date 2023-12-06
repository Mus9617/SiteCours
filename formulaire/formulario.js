let form = document.querySelector("form");
form.addEventListener("submit", valideFormulaire);

function valideFormulaire() {
  var nom = document.getElementById("nom").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var telephone = document.getElementById("telephone").value;
  var recommandations = document.getElementById("recommandations").value;
  var politique = document.getElementById("politique").value;

  if (
    nom === "" ||
    name === "" ||
    email === "" ||
    politique === "" ||
    telephone === "" ||
    recommandations === ""
  ) {
    alert("S'il-vous-plaît , completez le champ requis contenant une *.");
    return false;
  } else {
    alert("Merci! Votre message a été envoyé ");
    return true;
  }
}
