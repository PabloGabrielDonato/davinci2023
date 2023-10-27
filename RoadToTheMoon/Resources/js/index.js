// navbar

document.addEventListener("DOMContentLoaded", function () {
  // Selecciona todos los elementos ancla dentro del menú
  const menuLinks = document.querySelectorAll("#menuToggle a");

  // Agrega un controlador de eventos a cada enlace
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Desmarca la casilla de verificación (cierra el menú)
      document.querySelector("#menuToggle input").checked = false;
    });
  });
});
