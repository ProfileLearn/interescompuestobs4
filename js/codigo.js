/* 
PRIMERO TRABAJAR LOS CAMPOS COMO STRING ok
APLICAR REGEX EN TIEMPO REAL MIENTRAS SE INGRESAN LOS DATOS ok
CONVERTIR LOS STRINGS EN NUMEROS PARA PASARLE A LA FUNCIÓN DE CALCULOS ok
SEPARAR LA FUNCION DE RENDERIZADO DE LA DEL CALCULO ok
QUITAR resultado de obj ok
CONVERTIR ESOS NÚMEROS NUEVAMENTE A STRING PARA MOSTRAR EN EL INPUT DE RESULTADO ok
Unificar las funciones dotseparation ok
Revisar que los datos se conviertan a tipo number antes de llamar a funcion interes ok
Agregar manejador de "," (comas en el formulario)
Cuando se permita agregar un handler para que se pueda usar en el porcentaje
y un handler para que si se presiona "." se convierta en ","
La "," luego deberá a ser convertida en "." cuando se convierta string a number
*/
/*
Handler input
-formatear texto
handler click


*/

const obj = {
	tna: document.getElementById('tnaIn'),
	montoInicial: document.getElementById('inicialIn'),
	plazo: document.getElementById('plazoIn'),
	ciclos: document.getElementById('ciclosIn'),
	adicional: document.getElementById('adicionalIn'),
}

function interes({ montoInicial, tna, plazo, ciclos, adicional }) {
	const tnaPorDia = ((tna / 365) / 100);
	adicional *= 1;
	let resParcial = (montoInicial) * ((tnaPorDia * plazo) + 1);
	resParcial += adicional;
	if (ciclos > 1) {
		return interes({ montoInicial: resParcial, tna, plazo, ciclos: ciclos - 1, adicional });
	}
	return resParcial;
};

function calHandleClick() {

	const values = obtainValues(obj);
	for (const prop in values) {
		values[prop] = textToNum(values[prop]);
		if (isNaN(values[prop])) { values[prop] = 0 };
	}

	let retorno = interes(values)
	// hasta aquí retorno es number
	retorno = retorno.toFixed(2); // aquí se convierte a strings
	retorno = dotFormat(retorno);
	const resultado = document.getElementById('resultadoIn');
	render(resultado, retorno)
}

function keydownHandler(event) {

}

function obtainValues(values) {
	const objValues = {};
	for (const prop in values) {
		objValues[prop] = values[prop].value;
	}
	return objValues;
}

function clearHandleClick() {
	for (const prop in obj) {
		obj[prop].value = "";
	}
}

function textToNum(text) {
	const transitionText = text.replace(/\./g, '')
	const number = Number.parseFloat(transitionText);
	return number;
}

function dotFormat(text, dinamic = false) {

	const clearText = dinamic ? text.replace(/\./g, '') : text.replace(/\./, ',');
	const regex = /\B(?=(\d{3})+(?!\d))/g;
	let retorno = clearText.replace(regex, '.');

	return retorno;
}


function inputHandler(event) {

	const id = event.target.id;
	const target = event.target;

	if (id === 'inicialIn' || id === 'adicionalIn') {
		target.value = target.value.replace(/[^\d,]/g, '')
		target.value = dotFormat(target.value, true);
	} else if (id === 'tnaIn') {
		target.value = target.value.replace(/[^\d,]/g, '')
		target.value = target.value.replace(/(?<!\d),/g, '')
		target.value = target.value.replace(/,(?=(\d+)\D)/g, ',')
	} else {
		target.value = target.value.replace(/\D/g, '')
	}
}

function render(element, value) {
	element.value = value;
}


document.querySelector('.app').addEventListener('input', inputHandler);
document.querySelector('.app').addEventListener('keydown', keydownHandler);
document.querySelector('#calcular').addEventListener('click', calHandleClick);
document.querySelector('#clear').addEventListener('click', clearHandleClick);
