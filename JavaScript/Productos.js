<script>
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('.nav-link.productos').addEventListener('click', (e) => {
    e.preventDefault(); // Detiene la navegación predeterminada
    document.getElementById('products-section').style.display = 'block'; // Muestra la sección de productos
  });
});
</script>
