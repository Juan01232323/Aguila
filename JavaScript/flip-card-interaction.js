// Asegúrate de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Escucha eventos de click en todos los elementos .flip-card
  document.querySelectorAll('.flip-card').forEach(function(card) {
    card.addEventListener('click', function() {
      // Agrega o quita la clase 'is-flipped'
      card.classList.toggle('is-flipped');
    });
  });
});
