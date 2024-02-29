
// doolar hoy de dolar API
document.addEventListener('DOMContentLoaded', function() {
    obtenerValorDolar();
});

function obtenerValorDolar() {
    fetch("https://dolarapi.com/v1/dolares/oficial")
        .then(function(response) {
            if (!response.ok) {
                throw new Error('No se pudo obtener el valor del dólar');
            }
            return response.json();
        })
        .then(function(data) {
            // JSON en la consola
            console.log("Datos del dólar:", data);

            // compra y venta
            const valorCompra = data.compra;
            const valorVenta = data.venta;
            
            // valores en el DOM
            const dolarContainer = document.getElementById("dolar-container");
            dolarContainer.innerHTML = "<p>Compra: $" + valorCompra + "</p><p>Venta: $" + valorVenta + "</p>";
            
        })
        .catch(function(error) {
            console.error("Error al obtener el valor del dólar:", error);
        });
}

// tipo "carrito" donde se ven los prestamos calculados

let carritoPrestamos = [];

function calcularPrestamo() {
    const monto = parseFloat(document.getElementById("monto").value);
    const tasaInteres = parseFloat(document.getElementById("tasaInteres").value);
    const plazo = parseInt(document.getElementById("plazo").value);

    const tasaInteresMensual = tasaInteres / 100 / 12;
    const cuotaMensual = monto * tasaInteresMensual / (1 - (1 + tasaInteresMensual) ** -plazo);
    const pagoTotal = cuotaMensual * plazo;

    const cuotaPrestamo = {
        cuotaMensual: cuotaMensual.toFixed(2),
        pagoTotal: pagoTotal.toFixed(2),
        monto: monto,
        tasaInteres: tasaInteres,
        plazo: plazo
    };

    carritoPrestamos.push(cuotaPrestamo);

    actualizarCarrito();

    // localStorage
    guardarEnLocalStorage("carritoPrestamos", JSON.stringify(carritoPrestamos));
    
    return cuotaPrestamo;
}

function actualizarCarrito() {
    const carritoContainer = document.getElementById("carritoContainer");
    carritoContainer.innerHTML = ''; 

    carritoPrestamos.forEach((prestamo, index) => {
        const prestamoElement = document.createElement("div");
        prestamoElement.innerHTML = `
            <p>Monto: $${prestamo.monto}</p>
            <p>Tasa de Interés: ${prestamo.tasaInteres}%</p>
            <p>Plazo: ${prestamo.plazo} meses</p>
            <p>Cuota Mensual: $${prestamo.cuotaMensual}</p>
            <p>Pago Total: $${prestamo.pagoTotal}</p>
            <button onclick="eliminarPrestamo(${index})" class="btn btn-info btn-lg btn-block">Eliminar</button>
        `;
        carritoContainer.appendChild(prestamoElement);
    });
}

function eliminarPrestamo(index) {
    carritoPrestamos.splice(index, 1);
    actualizarCarrito();
    guardarEnLocalStorage("carritoPrestamos", JSON.stringify(carritoPrestamos));
}

function guardarEnLocalStorage(clave, valor) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(clave, valor);
    } else {
        console.error("El navegador no soporta localStorage.");
    }
}

// recuperar el carrito del localStorage
window.onload = function() {
    const carritoGuardado = localStorage.getItem("carritoPrestamos");
    if (carritoGuardado) {
        carritoPrestamos = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
};

//solicitud prestamos

let solicitudesPrestamo = []; 

document.addEventListener('DOMContentLoaded', function() {
  const solicitudForm = document.getElementById('solicitudForm');
  const mensajeSolicitud = document.getElementById('mensajeSolicitud');

  solicitudForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const monto = document.getElementById('monto').value; 

    solicitarPrestamo(nombre, apellido, email, monto);



  });

  function solicitarPrestamo(nombre, apellido, email, monto) {
    const solicitud = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      monto: monto,
    };

    
    solicitudesPrestamo.push(solicitud);

    // mensaje de pedido
    mensajeSolicitud.textContent = `Su pedido de: $${monto} está en proceso, nos comunicaremos con usted.`;
    mensajeSolicitud.style.display = "block";

    // Guardar formato JSON
    guardarSolicitudesJSON();
  }

  function guardarSolicitudesJSON() {
    // solicitudes a JSON
    const solicitudesJSON = JSON.stringify(solicitudesPrestamo);

    // JSON en el localStor
    localStorage.setItem('solicitudesPrestamo', solicitudesJSON);
  }

});

  

