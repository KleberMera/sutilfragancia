document.addEventListener("DOMContentLoaded", function () {
  const pagoEfectivoBtn = document.getElementById("pagoEfectivoBtn");
  const montoEfectivoInput = document.getElementById("montoEfectivo");
  const confirmarPagoEfectivoBtn = document.getElementById(
    "confirmarPagoEfectivoBtn"
  );

  pagoEfectivoBtn.addEventListener("click", function () {
    mostrarTotal();
    mostrarSeccionPagoEfectivo();
  });

  confirmarPagoEfectivoBtn.addEventListener("click", function () {
    const montoIngresado = parseFloat(montoEfectivoInput.value);

    if (isNaN(montoIngresado) || montoIngresado < 0) {
      alert("Por favor, ingrese un monto válido.");
      return;
    }

    const total = parseFloat(
      document.getElementById("totalAmount").textContent
    );

    if (montoIngresado === total) {
      // Monto igual al total, proceder al pago
      alert("Pago realizado con éxito. Puede imprimir el recibo.");
      mostrarRecibo();
    } else if (montoIngresado > total) {
      // Monto mayor al total, mostrar cambio y proceder al pago
      const cambio = montoIngresado - total;
      alert(`Pago realizado con éxito. Cambio: $${cambio.toFixed(2)}`);
      mostrarRecibo();
    } else {
      // Monto menor al total, no permitir el pago
      alert("El monto ingresado es insuficiente. Verifique el monto.");
    }
  });

  function mostrarSeccionPagoEfectivo() {
    const pagoEfectivoSection = document.querySelector(".pago-efectivo");
    pagoEfectivoSection.style.display = "block";
  }

  function mostrarTotal() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce(
      (acc, producto) => acc + producto.cantidad * producto.precio,
      0
    );
    document.getElementById("totalAmount").textContent = total.toFixed(2);
    document.getElementById("totalContainer").style.display = "block";
  }

  function mostrarRecibo() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = parseFloat(
      document.getElementById("totalAmount").textContent
    );
    const montoIngresado = parseFloat(
      document.getElementById("montoEfectivo").value
    );

    const detalleProductos = document.getElementById("detalleProductos");
    detalleProductos.innerHTML = ""; // Limpiar contenido previo

    // Crear encabezado de tabla
    const encabezado = detalleProductos.createTHead();
    const encabezadoFila = encabezado.insertRow();
    const encabezadoProducto = encabezadoFila.insertCell(0);
    const encabezadoCantidad = encabezadoFila.insertCell(1);
    const encabezadoSubtotal = encabezadoFila.insertCell(2);
    encabezadoProducto.innerHTML = "<strong>Producto</strong>";
    encabezadoCantidad.innerHTML = "<strong>Cantidad</strong>";
    encabezadoSubtotal.innerHTML = "<strong>Subtotal</strong>";

    // Crear cuerpo de tabla
    const cuerpo = detalleProductos.createTBody();

    // Llenar tabla con productos y cantidades
    carrito.forEach((producto) => {
      const fila = cuerpo.insertRow();
      const celdaProducto = fila.insertCell(0);
      const celdaCantidad = fila.insertCell(1);
      const celdaSubtotal = fila.insertCell(2);
      celdaProducto.textContent = producto.nombre;
      celdaCantidad.textContent = producto.cantidad;
      celdaSubtotal.textContent = (producto.cantidad * producto.precio).toFixed(
        2
      );
    });

    const totalRecibo = document.getElementById("totalRecibo");
    const cambioRecibo = document.getElementById("cambioRecibo");
    const fechaHora = document.getElementById("fechaHora");

    totalRecibo.textContent = `Total: $${total.toFixed(2)}`;
    fechaHora.textContent = `Fecha y Hora: ${new Date().toLocaleString()}`;

    if (montoIngresado === total) {
      // Monto igual al total, proceder al pago
      cambioRecibo.textContent = "Pago realizado con éxito. No hay cambio.";
    } else if (montoIngresado > total) {
      // Monto mayor al total, mostrar cambio y proceder al pago
      const cambio = montoIngresado - total;
      cambioRecibo.textContent = `Pago realizado con éxito. Cambio: $${cambio.toFixed(
        2
      )}`;
    } else {
      // Monto menor al total, no permitir el pago
      cambioRecibo.textContent =
        "El monto ingresado es insuficiente. Verifique el monto.";
    }

    // Mostrar modal de recibo
    const modalRecibo = document.getElementById("modalRecibo");
    modalRecibo.style.display = "block";
  }
});
