document.addEventListener("DOMContentLoaded", function () {
  // Llamadas a funciones al cargar el DOM
  displayUserInfo();
  cerrarSesion();
  agregarEventosProductos();
  actualizarInterfaz();
});

function displayUserInfo() {
  var loggedInUser = localStorage.getItem("loggedInUser");
  var usersData = JSON.parse(localStorage.getItem("users")) || [];
  var currentUser = usersData.find((user) => user.username === loggedInUser);

  if (currentUser) {
    var userInfoSection = document.querySelector(".user-info");
    userInfoSection.innerHTML = `
      <p>Cédula: ${currentUser.cedula}</p>
      <p>Nombres: ${currentUser.nombres}</p>
      <p>Apellidos: ${currentUser.apellidos}</p>
      <p>Ciudad: ${currentUser.ciudad}</p>
    `;
  }
}

function cerrarSesion() {
  var loggedInUser = localStorage.getItem("loggedInUser");
  var loginStatusElement = document.getElementById("login-status");

  if (loggedInUser) {
    loginStatusElement.innerHTML = "Cerrar Sesión - " + loggedInUser;
  } else {
    loginStatusElement.innerHTML = "Inicio de Sesión";
  }

  loginStatusElement.addEventListener("click", function () {
    var confirmation = confirm("¿Estás seguro de que deseas cerrar sesión?");

    if (confirmation) {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    }
  });
}

function agregarEventosProductos() {
  const productosAgregadosSection = document.querySelector(".productos-agregados");

  productosAgregadosSection.addEventListener("click", function (event) {
    if (event.target.classList.contains("eliminar-producto-btn")) {
      const productId = event.target.dataset.productId;
      const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este producto?");

      if (confirmacion) {
        eliminarProducto(productId);
        actualizarInterfaz();
        window.alert("Producto eliminado");
      }
    }
  });
}

function eliminarProducto(productId) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter((producto) => producto.id !== productId);
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarInterfaz() {
  const productosAgregadosSection = document.querySelector(".productos-agregados");
  const totalSection = document.querySelector(".total");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  productosAgregadosSection.innerHTML = "";

  carrito.forEach((producto) => {
    const productoElement = document.createElement("div");
    productoElement.classList.add("producto-agregado");

    const subtotal = producto.cantidad * producto.precio;

    productoElement.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <p>Cantidad: ${producto.cantidad}</p>
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <button class="eliminar-producto-btn" data-product-id="${producto.id}">Eliminar</button>
    `;

    productosAgregadosSection.appendChild(productoElement);
  });

  const total = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
  totalSection.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
}
