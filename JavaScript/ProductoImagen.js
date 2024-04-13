document.addEventListener('DOMContentLoaded', () => {

  // Supongamos que tienes esta estructura de datos para mapear los productos y sus imágenes por color
  const productImagesByColor = {
    'Camillas Cuadradas': {
      'Negro': 'img/camilla1.jpg',
      'Azul': 'img/camilla3.jpg',
      'Verde': '',
      'Blanco': 'img/camilla4.jpg',
      'Gris': 'img/camilla6.jpg',
      'Rosa': '',

    },
    'Camillas Rombo': {
      'Negro': '',
      'Azul': '',
      'Verde': 'img/camilla5.jpg',
      'Blanco': '',
      'Gris': '',
      'Rosa': 'img/camilla7.jpg',

    }
  };

  const cart = JSON.parse(localStorage.getItem('cart')) || [];


  document.addEventListener('change', (event) => {
    if (event.target.classList.contains('color-select')) {
      const index = event.target.getAttribute('data-index');
      const color = event.target.value;
      const product = cart[index];
      const newImageSrc = productImagesByColor[product.name][color];
  
      const cartItemEl = event.target.closest('.cart-item');
      const colorNotAvailableMsgEl = cartItemEl.querySelector('.color-not-available-msg');
  
      if (!newImageSrc) {
        if (colorNotAvailableMsgEl) {
          colorNotAvailableMsgEl.textContent = 'Este color no está disponible para este producto.';
        } else {
          const msgEl = document.createElement('p');
          msgEl.classList.add('color-not-available-msg');
          msgEl.textContent = 'Este color no está disponible para este producto.';
          msgEl.style.color = 'red'; // Agrega tu estilo aquí
          cartItemEl.appendChild(msgEl);
        }
      } else {
        if (colorNotAvailableMsgEl) {
          cartItemEl.removeChild(colorNotAvailableMsgEl);
        }
        product.imageSrc = newImageSrc;
        cartItemEl.querySelector('.cart-item-image').src = newImageSrc;
        product.color = color;
        saveCart();
      }
    }
  });

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Actualizar el contador cada vez que se guarde el carrito

  }

  updateCartCount();

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

      saveCart();
      updateCartCount();
      alert(`${productName} ha sido agregado al carrito.`);
    }
  });

  function calcularTotal() {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  }

  function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
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
            <option value="Azul">Azul</option>
            <option value="Verde">Verde</option>
            <option value="Blanco">Blanco</option>
            <option value="Gris">Gris</option>
            <option value="Rosa">Rosa</option>
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
        updateCartCount(); // Actualizar el contador del carrito
        showCart();
      });
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', function() {
        const index = parseInt(this.getAttribute('data-index'));
        if (this.value <= 0) {
          cart.splice(index, 1); // Eliminar el producto si la cantidad es 0 o menos
        } else {
          cart[index].quantity = parseInt(this.value);
        }
        saveCart();
        updateCartCount(); // Actualizar el contador del carrito
        document.getElementById('total-price').textContent = calcularTotal();
        showCart();
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
