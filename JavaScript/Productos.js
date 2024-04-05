document.addEventListener('DOMContentLoaded', () => {
  const inicioLink = document.querySelector('.nav-link[href="#"]');
  const productosLink = document.querySelector('.nav-link[href="#products-section"]');
  const productsSection = document.getElementById('products-section');

  // Oculta todas las secciones excepto la sección de productos
  productosLink.addEventListener('click', (event) => {
      event.preventDefault();
      productsSection.style.display = 'block'; // Muestra la sección de productos
      document.querySelectorAll('section').forEach(section => {
          if (section.id !== 'products-section') {
              section.style.visibility = 'hidden'; // Hace invisible la sección, pero sigue ocupando espacio
              section.style.position = 'absolute'; // Saca la sección del flujo del documento
          }
      });
      productsSection.style.visibility = 'visible';
      productsSection.style.position = 'static'; // Pone la sección de productos de nuevo en el flujo del documento
      productsSection.scrollIntoView(); // Desplaza la vista a la sección de productos
  });

  // Muestra todas las secciones y oculta la sección de productos al hacer clic en "Inicio"
  inicioLink.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelectorAll('section').forEach(section => {
          section.style.visibility = 'visible'; // Hace visible la sección
          section.style.position = 'static'; // Pone la sección de nuevo en el flujo del documento
      });
      productsSection.style.display = 'none'; // Oculta la sección de productos
      window.scrollTo(0, 0); // Desplaza la vista al principio de la página
  });
});
