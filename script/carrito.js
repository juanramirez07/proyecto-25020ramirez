document.addEventListener('DOMContentLoaded', () => {
  cargarProductosCarrito();
});

function cargarProductosCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
  const tabla = document.querySelector('#tabla_carrito');
  tabla.innerHTML = '';
  let subtotal = 0;

  if (carrito.length === 0) {
    tabla.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 20px;">
      Tu carrito está vacío. <a href="./tienda.html">Agregá productos</a>.
    </td></tr>`;
  } else {
    carrito.forEach(producto => {
      tabla.innerHTML += crearFilaProducto(producto);
      subtotal += producto.price * producto.cantidad;
    });
  }

  actualizarTotal(subtotal);
  asignarEventos();
}

function crearFilaProducto(producto) {
  const subtotal = (producto.price * producto.cantidad).toFixed(3);
  const titulo = producto.title.length > 20 ? producto.title.substring(0, 20) + '...' : producto.title;

  return `
    <tr>
      <td><button class="remove-btn" data-id="${producto.id}"><i class="far fa-times-circle"></i></button></td>
      <td><img src="${producto.image}" alt="${producto.title}" style="height: 80px; object-fit: contain;"></td>
      <td>${titulo}</td>
      <td>$${producto.price.toFixed(3)}</td>
      <td><input type="number" min="1" value="${producto.cantidad}" class="cantidad-input" data-id="${producto.id}"></td>
      <td>$${subtotal}</td>
    </tr>
  `;
}

function actualizarTotal(subtotal) {
  document.querySelectorAll('#total').forEach(el => {
    el.textContent = subtotal.toFixed(3);
  });
}

function asignarEventos() {
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
      carrito = carrito.filter(prod => prod.id !== id);
      localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
      cargarProductosCarrito();
    });
  });

  document.querySelectorAll('.cantidad-input').forEach(input => {
    input.addEventListener('change', () => {
      const id = parseInt(input.dataset.id);
      const nuevaCantidad = Math.max(1, parseInt(input.value));
      let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
      const producto = carrito.find(p => p.id === id);
      if (producto) {
        producto.cantidad = nuevaCantidad;
        localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
        cargarProductosCarrito();
      }
    });
  });
}