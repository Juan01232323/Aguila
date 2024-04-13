document.addEventListener('DOMContentLoaded', () => {
    const inicioLink = document.querySelector('.nav-link[href="#"]');
    const productosLink = document.querySelector('.nav-link[href="#products-section"]');
    const cartIconLink = document.querySelector('.nav-icon .icon-link');
    const productsSection = document.getElementById('products-section');
    const productDetailSection = document.getElementById('product-detail');
    const productsPrevButton = document.querySelector('.products-prev'); // Selecciona el botón Prev
    const productsNavigation = document.querySelector('.products-navigation'); // Selecciona la navegación de productos
    const productsNextButton = document.querySelector('.products-next'); // Selecciona el botón Next

  
    productosLink.addEventListener('click', function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace
        if (productsSection.style.display === 'none' || !productsSection.style.display) {
            productsSection.style.display = 'block'; // Muestra la sección
            window.scrollTo({
              top: productsSection.offsetTop, // Desplaza la vista hacia la sección de productos
              behavior: 'smooth' // Hace que el desplazamiento sea suave
            });
        } else {
            productsSection.style.display = 'none'; // Oculta la sección si ya está visible
        }
    });
  
    inicioLink.addEventListener('click', (event) => {
        event.preventDefault();
        ocultarTodasLasSecciones();
        document.querySelector('.hero-section').style.display = 'block';
    });
  
    cartIconLink.addEventListener('click', (event) => {
        event.preventDefault();
        ocultarTodasLasSecciones();
        productDetailSection.style.display = 'block';
    });

    inicioLink.addEventListener('click', (event) => {
        event.preventDefault();
        // Recarga la página para volver al estado inicial
        window.location.href = window.location.origin + window.location.pathname;
    });

    cartIconLink.addEventListener('click', (event) => {
        event.preventDefault();
        mostrarCarritoCompras();
    });
  
    function mostrarSeccionProductos() {
        ocultarTodasLasSecciones();
        productsSection.style.display = 'block';
    }

    function mostrarCarritoCompras() {
        ocultarTodasLasSecciones();
        productDetailSection.style.display = 'block';
    }

    // Función auxiliar para ocultar todas las secciones
    function ocultarTodasLasSecciones() {
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });
    }
});
