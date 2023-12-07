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
