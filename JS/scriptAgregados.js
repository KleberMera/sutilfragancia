document.addEventListener("DOMContentLoaded", function () {
    // Obtener detalles del usuario
    var loggedInUser = localStorage.getItem("loggedInUser");
    var loginStatusElement = document.getElementById("login-status");

    if (loggedInUser) {
        // Si hay un usuario autenticado, mostrar "Cerrar Sesión" y el nombre de usuario
        loginStatusElement.innerHTML = "Cerrar Sesión - " + loggedInUser;
    } else {
        // Si no hay un usuario autenticado, mostrar "Inicio de Sesión"
        loginStatusElement.innerHTML = "Inicio de Sesión";
    }

    // Puedes agregar más lógica para mostrar detalles del usuario según tus necesidades
});

// Puedes agregar más funciones o lógica específica para la página de Agregados aquí

