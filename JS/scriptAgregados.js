document.addEventListener("DOMContentLoaded", function () {
  // Obtén la sección de productos agregados
  displayUserInfo();
  cerrarSesion()

  // Obtén la sección de productos agregados y el total
  const productosAgregadosSection = document.querySelector(
    ".productos-agregados"
  );
  const totalSection = document.querySelector(".total");

  // Obtén el carrito desde el localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Actualizar la interfaz con los productos del carrito
  actualizarInterfaz();

  function actualizarInterfaz() {
    // Limpia la sección antes de agregar los productos
    productosAgregadosSection.innerHTML = "";

    // Recorre el carrito y agrega productos a la interfaz
    carrito.forEach((producto) => {
      const productoElement = document.createElement("div");
      productoElement.classList.add("producto-agregado");

      // Calcula el subtotal del producto
      const subtotal = producto.cantidad * producto.precio;

      // Aquí puedes construir la estructura HTML para mostrar la información del producto
      // Incluyendo el subtotal
      productoElement.innerHTML = `
              <h3>${producto.nombre}</h3>
              <p>Precio: $${producto.precio.toFixed(2)}</p>
              <p>Cantidad: ${producto.cantidad}</p>
              <p>Subtotal: $${subtotal.toFixed(2)}</p>
              <!-- Otros detalles del producto -->
          `;

      // Agrega el producto al contenedor
      productosAgregadosSection.appendChild(productoElement);
    });

    // Calcula el total sumando los subtotales de todos los productos
    const total = carrito.reduce(
      (acc, producto) => acc + producto.cantidad * producto.precio,
      0
    );

    // Actualiza la interfaz con el total
    totalSection.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
  }
});

function displayUserInfo() {
  // Obtener el nombre de usuario del localStorage
  var loggedInUser = localStorage.getItem("loggedInUser");

  // Obtener la información del usuario desde localStorage
  var usersData = JSON.parse(localStorage.getItem("users")) || [];

  // Buscar el usuario en el array por el nombre de usuario
  var currentUser = usersData.find((user) => user.username === loggedInUser);

  if (currentUser) {
    // Mostrar la información del usuario en la sección correspondiente
    var userInfoSection = document.querySelector(".user-info");
    userInfoSection.innerHTML = `
     <p>Cédula: ${currentUser.cedula}</p>
     <p>Nombres: ${currentUser.nombres}</p>
     <p>Apellidos: ${currentUser.apellidos}</p>
     <p>Ciudad: ${currentUser.ciudad}</p>

     <!-- Agrega más información del usuario según sea necesario -->
   `;
  }
  // Agrega más detalles del usuario según sea necesario
}

function cerrarSesion() {
  // Verificar si hay un usuario autenticado almacenado en localStorage
  var loggedInUser = localStorage.getItem("loggedInUser");
  var loginStatusElement = document.getElementById("login-status");

  if (loggedInUser) {
    // Si hay un usuario autenticado, mostrar "Cerrar Sesión" y el nombre de usuario
    loginStatusElement.innerHTML = "Cerrar Sesión - " + loggedInUser;
  } else {
    // Si no hay un usuario autenticado, mostrar "Inicio de Sesión"
    loginStatusElement.innerHTML = "Inicio de Sesión";
  }

  loginStatusElement.addEventListener("click", function () {
    var confirmation = confirm("¿Estás seguro de que deseas cerrar sesión?");

    if (confirmation) {
      // Limpiar el usuario autenticado al cerrar sesión
      localStorage.removeItem("loggedInUser");

      // Redirigir al índice u otra página
      window.location.href = "index.html";
    }
  });
}
