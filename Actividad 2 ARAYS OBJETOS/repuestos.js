const presupuestos = [];

function calcularPresupuesto(precio) {
    const iva = precio * 0.21;
    const precioContado = precio + iva;
    const interes = precioContado * 0.10;
    const precioConInteres = precioContado + interes;
    const cuota24 = precioConInteres / 24;
    const cuota36 = precioConInteres / 36;

    return {
        iva,
        precioContado,
        interes,
        precioConInteres,
        cuota24,
        cuota36
    };
}

document.getElementById("formPresupuesto").addEventListener("submit", function(e){
    e.preventDefault();

    const cliente = document.getElementById("cliente").value;
    const select = document.getElementById("vehiculo");

    const vehiculo = select.options[select.selectedIndex].text;
    const precio = parseFloat(select.value);

    const datos = calcularPresupuesto(precio);

    presupuestos.push({
        cliente,
        vehiculo,
        precio,
        ...datos
    });

    document.getElementById("resultado").innerHTML = `
        <h3>Presupuesto</h3>
        Cliente: ${cliente}<br>
        Vehículo: ${vehiculo}<br>
        Precio Lista: ${precio}<br>
        IVA: ${datos.iva.toFixed(2)}<br>
        Precio Contado: ${datos.precioContado.toFixed(2)}<br>
        Interés: ${datos.interes.toFixed(2)}<br>
        Precio con Interés: ${datos.precioConInteres.toFixed(2)}<br>
        Cuota 24: ${datos.cuota24.toFixed(2)}<br>
        Cuota 36: ${datos.cuota36.toFixed(2)}
    `;
});

function buscarCliente(){
    const nombre = document.getElementById("buscarCliente").value.toLowerCase();

    const encontrados = presupuestos.filter(
        p => p.cliente.toLowerCase().includes(nombre)
    );

    let salida = "<ul>";

    encontrados.forEach(p => {
        salida += `<li>${p.cliente}: ${p.vehiculo}</li>`;
    });

    salida += "cliente no encontrado</ul>";

    document.getElementById("listaCliente").innerHTML = salida;
}

function mostrarMayores(){
    const mayores = presupuestos.filter(p => p.precio > 35);

    let salida = "<ul>";

    mayores.forEach(p => {
        salida += `<li>${p.vehiculo} - ${p.precio}</li>`;
    });

    salida += "</ul>";

    document.getElementById("listaMayores").innerHTML = salida;
}