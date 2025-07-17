let productosGlobales = [];
const URL_JSON = '../datos/productos.json';

async function obtenerProductos() {
  try {
    const res = await fetch(URL_JSON);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    productosGlobales = await res.json();
    return productosGlobales;
  } catch (error) {
    console.error('Error al cargar productos:', error);
    return [];
  }
}

function crearProductoHTML(producto) {
  const tituloReducido = producto.title.substring(0, 25) + '...';
  return `
    <div class="producto">
      <img src="${producto.image}" alt="${producto.title}">
      <div class="producto-descripcion">
        <span>${producto.category}</span>
        <h5>${tituloReducido}</h5>
        <h4>$${producto.price.toFixed(3)}</h4>
      </div>
      <button id="btn-agregar-${producto.id}" class="btn-comprar">Comprar</button>
    </div>
  `;
}

function renderizarProductos(productos) {
  const contenedor = document.querySelector('.productos-container');
  const tarjetas = productos.map(crearProductoHTML);
  contenedor.innerHTML = tarjetas.join('');
  adjuntarEventosCarrito();
}

function adjuntarEventosCarrito() {
  productosGlobales.forEach(producto => {
    const boton = document.getElementById(`btn-agregar-${producto.id}`);
    if (boton) {
      boton.addEventListener('click', () => {
        agregarAlCarrito(producto);
      });
    }
  });
}

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

  const index = carrito.findIndex(p => p.id === producto.id);

  if (index !== -1) {
    carrito[index].cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      title: producto.title,
      price: producto.price,
      image: producto.image,
      cantidad: 1
    });
  }

  localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
  alert(`✅ ${producto.title} agregado al carrito`);
}

document.addEventListener('DOMContentLoaded', async () => {
  const productos = await obtenerProductos();
  if (productos.length > 0) renderizarProductos(productos);
});