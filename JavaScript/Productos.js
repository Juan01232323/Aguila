document.addEventListener('DOMContentLoaded', () => {
    const inicioLink = document.querySelector('.nav-link[href="#"]');
    const productosLink = document.querySelector('.nav-link[href="#products-section"]');
    const cartIconLink = document.querySelector('.nav-icon .icon-link');
    const productsSection = document.getElementById('products-section');
    const productDetailSection = document.getElementById('product-detail');
    const productsPrevButton = document.querySelector('.products-prev'); // Selecciona el botón Prev
    const productsNavigation = document.querySelector('.products-navigation'); // Selecciona la navegación de productos
    const productsNextButton = document.querySelector('.products-next'); // Selecciona el botón Next
  
    productosLink.addEventListener('click', (event) => {
        event.preventDefault();
        ocultarTodasLasSecciones();
        mostrarSeccionProductos();
        productsSection.style.display = 'block';
        // Muestra los botones de navegación solo cuando estás en la sección de productos
        productsPrevButton.style.display = 'block';
        productsNextButton.style.display = 'block';
        productsNavigation.style.display = 'none'; // Asegura que la navegación se muestre con los productos

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
