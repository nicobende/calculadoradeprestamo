function calcularPrestamo() {
    const monto = parseFloat(document.getElementById("monto").value);
    const tasaInteres = parseFloat(document.getElementById("tasaInteres").value);
    const plazo = parseInt(document.getElementById("plazo").value);

    const tasaInteresMensual = tasaInteres / 100 / 12;
    const cuotaMensual = monto * tasaInteresMensual / (1 - (1 + tasaInteresMensual) ** -plazo);
    const pagoTotal = cuotaMensual * plazo;

    const prestamoArray = [];

    const cuotaPrestamo = {
        cuotaMensual: cuotaMensual.toFixed(2),
        pagoTotal: pagoTotal.toFixed(2),
        monto: monto,
        tasaInteres: tasaInteres,
        plazo: plazo
    };

    // Uso de push
    prestamoArray.push(cuotaPrestamo);

    // DOM
    const pagoMensual = document.getElementById("pagoMensual");
    const montoTotal = document.getElementById("montoTotal");

    pagoMensual.innerText = `Pago Mensual: $${cuotaMensual.toFixed(2)}`;
    montoTotal.innerText = `Pago Total: $${pagoTotal.toFixed(2)}`;

    // LocalStorage
    guardarEnLocalStorage("cuotaMensual", cuotaMensual.toFixed(2));
    guardarEnLocalStorage("pagoTotal", pagoTotal.toFixed(2));
    guardarEnLocalStorage("prestamoArray", JSON.stringify(prestamoArray));

    // Uso de filter 
    const cuotasFiltradas = prestamoArray.filter(cuota => cuota.cuotaMensual > 100);

    // uso de map 
    const montosArray = prestamoArray.map(cuota => cuota.monto);

    console.log(cuotasFiltradas);
    console.log(montosArray);
}

function guardarEnLocalStorage(clave, valor) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(clave, valor);
    } else {
        console.error("El navegador no soporta localStorage.");
    }
}
