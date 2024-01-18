/* 
Simulador de aguinaldo 
ingresar 5 empleados o los que quiera
ingresar el suelgo de cada uno
agregar el 50% a cada sueldo 
mostrar resultados
*/

let empleado;
let dni;
let rol;
let sueldo;
let calcularAguinaldo;
let totalEmpleados;

function validarEmpleado (nombre){
    if (nombre == "" || (nombre.length < 3)){
        return false;
    }
    else {
        return true;
    }
}

function validarRol (posicion){
    if ((posicion === "administrador") || (posicion === "gerente") || (posicion === "empleado")){
        return true;
    }
    else {
        return false;
    }
}

function validarSueldo (salario){
    if ( !isNaN (salario)){
        return true;
    }
    else {
        return false;
    }
}

function aguinaldo (pago){
    let resultado  = pago * 1.50;
    return resultado;
}

function validarDni (documento){
    if ( (documento >= 1) && (documento < 100000000) && !isNaN(documento) ){
        return true;
    }
    else {
        return false;
    }
}


totalEmpleados = parseInt ( prompt("¿Cuantos empleados hay?"))

for ( let i=1; i <= totalEmpleados; i++) {

    do { //valida Empleado si no, vuelve a pedirlo
        empleado = prompt("Nombre Completo del Empleado");

        if (! validarEmpleado (empleado)){
            alert("Nombre Invalido");
        }
    }

    while (! validarEmpleado (empleado))

    do { //valida DNI si no, vuelve a pedirlo
        dni = prompt("DNI");
        if (! validarDni (dni)){
            alert ("DNI Invalido");
        }
    }

    while (! validarDni (dni))

    do { //valida Rol si no, vuelve a pedirlo
        rol = prompt("Rol")
        if (! validarRol (rol)){
            alert ("Rol Invalido")
        }
    }

    while (! validarRol (rol))

    do {
        sueldo =prompt("Salario")
        if (! validarSueldo (sueldo)){
            alert("Salario Invalido")
        }
    }

    while (! validarSueldo (sueldo))

    sueldo = aguinaldo(sueldo)

    let mensaje = empleado + ` | ` + dni + ` | ` + rol + ` | ` + sueldo;

    console.log (mensaje);

    alert(mensaje);
}


