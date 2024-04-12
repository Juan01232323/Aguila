document.addEventListener('DOMContentLoaded', () => {

  // Supongamos que tienes esta estructura de datos para mapear los productos y sus imágenes por color
  const productImagesByColor = {
    'Crema facial: TOTAL': {
      'Negro': 'img/camilla1.jpg',
      'Rojo': 'img/camilla1_verde.jpg',
      'Azul': 'img/camilla1_azul.jpg',
      'Verde': 'img/camilla1_verde.jpg',
    },
    'Bushy Brow': {
      'Negro': 'img/camilla2_rojo.jpg',
      'Rojo': 'img/camilla1_verde.jpg',
      'Azul': 'img/camilla2_azul.jpg',
      'Verde': 'img/camilla2_verde.jpg',
    }
  };


  document.addEventListener('change', (event) => {
    if (event.target.classList.contains('color-select')) {
      const index = event.target.getAttribute('data-index');
      const color = event.target.value;
      const product = cart[index];
      
      // Aquí necesitas actualizar la imagen basada en la selección de color
      // Suponiendo que tienes una función o un mapeo de productos a sus imágenes
      const newImageSrc = productImagesByColor[product.name][color];
      product.imageSrc = newImageSrc; // Actualiza la fuente de la imagen en el objeto del carrito
      
      // Actualiza la imagen en el DOM
      const cartItemEl = event.target.closest('.cart-item');
      cartItemEl.querySelector('.cart-item-image').src = newImageSrc;
      
      // Opcionalmente, actualiza el color en el objeto del carrito y guarda los cambios
      product.color = color;
      saveCart();
    }
  });
  


  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('product-add')) {
      const productItem = event.target.closest('.product-item');
      const productName = productItem.querySelector('.product-name').textContent;
      const productPrice = parseFloat(productItem.querySelector('.product-price').textContent.replace('$', ''));
      const productImageSrc = productItem.querySelector('.product-image').src;

      const existingProductIndex = cart.findIndex(item => item.name === productName);
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
      } else {
        cart.push({ name: productName, price: productPrice, imageSrc: productImageSrc, quantity: 1 });
      }

      alert(`${productName} ha sido agregado al carrito.`);
      saveCart();
    }
  });

  function calcularTotal() {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  }

  document.querySelector('.nav-icon .icon-link').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelectorAll('section').forEach(section => section.style.display = 'none');
    showCart();
  });

  function showCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((product, index) => {
      const cartItemEl = document.createElement('div');
      cartItemEl.classList.add('cart-item');
      cartItemEl.innerHTML = `
        <img class="cart-item-image" src="${product.imageSrc}" alt="${product.name}">
        <div class="cart-item-info">
          <h3 class="cart-item-name">${product.name}</h3>
          <p class="cart-item-price">$${product.price.toFixed(2)}</p>
          <select class="color-select" data-index="${index}">
            <option value="Negro">Negro</option>
            <option value="Rojo">Rojo</option>
            <option value="Azul">Azul</option>
            <option value="Verde">Verde</option>
          </select>
          <input type="number" class="quantity-input" value="${product.quantity}" min="1" data-index="${index}">
          <button class="remove-item" data-index="${index}">Eliminar</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItemEl);
      
      // Asegúrate de configurar el selector en el color actual del producto, si está disponible
      if(product.color) {
        cartItemEl.querySelector('.color-select').value = product.color;
      }
    });
  
    document.getElementById('total-price').textContent = calcularTotal();
    document.getElementById('product-detail').style.display = 'block';
  
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        cart.splice(index, 1);
        saveCart();
        showCart();
      });
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', function() {
        const index = parseInt(this.getAttribute('data-index'));
        cart[index].quantity = parseInt(this.value);
        saveCart();
        document.getElementById('total-price').textContent = calcularTotal();
      });
    });
  }

  document.querySelector('.nav-link[href="#products-section"]').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarSeccionProductos();
  });

  document.querySelector('.nav-link[href="#"]').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarSeccionInicial();
  });

  function mostrarSeccionProductos() {
    ocultarTodasLasSecciones();
    document.querySelector('.products-section').style.display = 'block';
  }

  function mostrarSeccionInicial() {
    ocultarTodasLasSecciones();
    document.querySelector('.hero-section').style.display = 'block';
  }

  function ocultarTodasLasSecciones() {
    document.querySelectorAll('section').forEach(section => {
      section.style.display = 'none';
    });
  }
});
