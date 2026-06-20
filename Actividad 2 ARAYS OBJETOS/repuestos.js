const vehiculos = [
    {nombre:"Chevrolet Corsa City", precio:39.45},
    {nombre:"Citroen C4", precio:63},
    {nombre:"Fiat Palio Weekend", precio:54.4},
    {nombre:"Fiat Siena", precio:37.2},
    {nombre:"Ford Explorer XLT 4x4", precio:42.9},
    {nombre:"Ford Ranger XLT 4x4", precio:66.6},
    {nombre:"Peugeot 306", precio:25},
    {nombre:"Renault Laguna", precio:29.5},
    {nombre:"Suzuki Fun", precio:32.59},
    {nombre:"Volkswagen Gol", precio:39.8},
    {nombre:"Volkswagen Suran", precio:13.32}
];

const presupuestos = [];

const selectVehiculo = document.getElementById("vehiculo");

vehiculos.forEach((v, indice) => {
    selectVehiculo.innerHTML += `
        <option value="${indice}">
            ${v.nombre}
        </option>
    `;
});

function calcularPresupuesto(precio){

    let iva = precio * 0.21;

    let precioContado = precio + iva;

    let interes = precioContado * 0.10;

    let precioConInteres = precioContado + interes;

    let cuota24 = precioConInteres / 24;

    let cuota36 = precioConInteres / 36;

    return{
        iva,
        precioContado,
        interes,
        precioConInteres,
        cuota24,
        cuota36
    };
}

document
.getElementById("formPresupuesto")
.addEventListener("submit", function(e){

    e.preventDefault();

    const nombre =
    document.getElementById("nombre").value;

    const apellido =
    document.getElementById("apellido").value;

    const indice =
    document.getElementById("vehiculo").value;

    const auto = vehiculos[indice];

    const calculo =
    calcularPresupuesto(auto.precio);

    const presupuesto = {

        nombre,
        apellido,
        vehiculo:auto.nombre,
        precio:auto.precio,

        iva:calculo.iva,
        contado:calculo.precioContado,
        interes:calculo.interes,
        final:calculo.precioConInteres,
        cuota24:calculo.cuota24,
        cuota36:calculo.cuota36
    };

    presupuestos.push(presupuesto);

    mostrarTabla();

    this.reset();

});

function mostrarTabla(){
    const tabla =
    document.getElementById("tablaPresupuestos");

    tabla.innerHTML = "";

    presupuestos.forEach(p => {

        tabla.innerHTML += `
        <tr>
            <td>${p.nombre} ${p.apellido}</td>
            <td>${p.vehiculo}</td>
            <td>${p.precio.toFixed(2)}</td>
            <td>${p.iva.toFixed(2)}</td>
            <td>${p.contado.toFixed(2)}</td>
            <td>${p.interes.toFixed(2)}</td>
            <td>${p.final.toFixed(2)}</td>
            <td>${p.cuota24.toFixed(2)}</td>
            <td>${p.cuota36.toFixed(2)}</td>
        </tr>
        `;
    });

}

function buscarCliente(){
    const cliente =
    document
    .getElementById("buscarCliente")
    .value
    .toLowerCase();
    const encontrados =
    presupuestos.filter(p =>
        p.nombre.toLowerCase().includes(cliente) ||
        p.apellido.toLowerCase().includes(cliente)
    );

    let salida = "";
    if(encontrados.length > 0){
        salida = "<ul>";
        encontrados.forEach(p => {
            salida += `
            <li>
                ${p.vehiculo}
            </li>
            `;
        });
        salida += "</ul>";
    }else{
        salida = "Cliente no encontrado";

    }

    document
    .getElementById("resultadoCliente")
    .innerHTML = salida;
}

function buscarPrecio(){

    const precio =
    parseFloat(
        document.getElementById("precioFiltro").value
    );

    const encontrados =
    vehiculos.filter(v =>
        v.precio > precio
    );

    let salida = "";

    if(encontrados.length > 0){

        salida = "<ul>";

        encontrados.forEach(v => {

            salida += `
            <li>
                ${v.nombre} - ${v.precio}
            </li>
            `;
        });

        salida += "</ul>";

    }else{

        salida = "No se encontraron vehículos.";

    }

    document
    .getElementById("resultadoPrecio")
    .innerHTML = salida;
}