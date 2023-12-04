// En el archivo script.js
document.addEventListener("DOMContentLoaded", function () {
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

  // Resto del código de script.js, como la función validateLogin() si es necesario
});

function validateLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var errorMessage = document.getElementById("error-message");

  // Obtener los usuarios de localStorage
  var existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Verificar las credenciales
  var userFound = existingUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (userFound) {
    // Almacenar el nombre de usuario en localStorage para mostrarlo después
    localStorage.setItem("loggedInUser", username);

    // Redirigir a la página de productos
    window.location.href = "productos.html";
  } else {
    errorMessage.innerHTML = "Usuario o contraseña incorrectos";
  }
}

function registerUser() {
  var cedula = document.getElementById("cedula").value;
  var nombres = document.getElementById("nombres").value;
  var apellidos = document.getElementById("apellidos").value;
  var fechaNacimiento = document.getElementById("fechaNacimiento").value;
  var nacionalidad = document.getElementById("nacionalidad").value;
  var ciudad = document.getElementById("ciudad").value;
  var newUsername = document.getElementById("newUsername").value;
  var newPassword = document.getElementById("newPassword").value;
  var errorMessage = document.getElementById("error-message");

  // Crear un objeto con los datos del usuario
  var userData = {
    cedula: cedula,
    nombres: nombres,
    apellidos: apellidos,
    fechaNacimiento: fechaNacimiento,
    nacionalidad: nacionalidad,
    ciudad: ciudad,
    username: newUsername,
    password: newPassword,
  };

  // Obtener los usuarios existentes de localStorage
  var existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Verificar si el usuario ya existe
  var userExists = existingUsers.some((user) => user.username === newUsername);

  if (!userExists) {
    // Agregar el nuevo usuario al array
    existingUsers.push(userData);

    // Almacenar el array actualizado en localStorage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    window.location.href = "index.html";
  } else {
    errorMessage.innerHTML =
      "Este usuario ya existe. Por favor, elige otro nombre de usuario.";
  }
}

function clearUserData() {
  var confirmation = confirm(
    "¿Estás seguro de que deseas borrar todos los datos?"
  );

  if (confirmation) {
    // Borrar todos los datos de localStorage
    localStorage.clear();
    alert("Todos los datos han sido borrados.");
  }
}

document.getElementById("login-status").addEventListener("click", function () {
  var confirmation = confirm("¿Estás seguro de que deseas cerrar sesión?");

  if (confirmation) {
    // Restablecer el estado del menú en productos
    document.getElementById("login-status").innerHTML = "Inicio de Sesión";
    // Puedes agregar más lógica aquí, como limpiar las variables de sesión
    alert("Sesión cerrada exitosamente.");
    // Redirigir al índice u otra página
    window.location.href = "index.html";
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const cantidadElement = document.querySelector('.cantidad');
  const menosBtn = document.getElementById('menos');
  const masBtn = document.getElementById('mas');
  const agregarCarritoBtn = document.querySelector('.agregar-carrito-btn');
  const agregadoBtn = document.querySelector('.agregado-btn');
  const disponibilidadElement = document.querySelector('.disponibilidad span');

  let cantidadDisponible = parseInt(disponibilidadElement.innerText); // Obtener la cantidad inicial disponible

  menosBtn.addEventListener('click', function () {
      if (parseInt(cantidadElement.innerText) > 1) {
          cantidadElement.innerText = parseInt(cantidadElement.innerText) - 1;
      }
  });

  masBtn.addEventListener('click', function () {
      if (parseInt(cantidadElement.innerText) < cantidadDisponible) {
          cantidadElement.innerText = parseInt(cantidadElement.innerText) + 1;
      }
  });

  agregarCarritoBtn.addEventListener('click', function () {
      const cantidadSeleccionada = parseInt(cantidadElement.innerText);
      if (cantidadSeleccionada > 0 && cantidadSeleccionada <= cantidadDisponible) {
          cantidadDisponible -= cantidadSeleccionada;
          disponibilidadElement.innerText = cantidadDisponible; // Actualizar la cantidad disponible en el HTML
          cantidadElement.innerText = '0';
          agregarCarritoBtn.style.display = 'none';
          agregadoBtn.style.display = 'inline-block';
      }
  });
});

