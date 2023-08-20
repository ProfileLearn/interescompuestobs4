/* 
PRIMERO TRABAJAR LOS CAMPOS COMO STRING ok
APLICAR REGEX EN TIEMPO REAL MIENTRAS SE INGRESAN LOS DATOS ok
CONVERTIR LOS STRINGS EN NUMEROS PARA PASARLE A LA FUNCIÓN DE CALCULOS ok
SEPARAR LA FUNCION DE RENDERIZADO DE LA DEL CALCULO ok
QUITAR resultado de obj ok
CONVERTIR ESOS NÚMEROS NUEVAMENTE A STRING PARA MOSTRAR EN EL INPUT DE RESULTADO ok
Unificar las funciones dotseparation ok
Revisar que los datos se conviertan a tipo number antes de llamar a funcion interes ok
Agregar manejador de "," (comas en el formulario) ok
Cuando se permita agregar un handler para que se pueda usar en el porcentaje 
y un handler para que si se presiona "." se convierta en "," (ok, solo en convierte punto por coma en el porcentaje)
La "," luego deberá a ser convertida en "." cuando se convierta string a number ok
*/

// Crea un objeto con referencias a los elementos del formulario

const domObject = {
	tna: document.getElementById('tnaIn'),
	montoInicial: document.getElementById('inicialIn'),
	plazo: document.getElementById('plazoIn'),
	ciclos: document.getElementById('ciclosIn'),
	adicional: document.getElementById('adicionalIn'),
}

const tooltipsObject = {
	tna: 'Tasa Nominal Anual. Porcentaje de interés a 365 días, sin tocar la inversión',
	inicial: 'Monto inicial a invertir',
	plazo: 'Cantidad de días que dura el ciclo de inversión',
	ciclos: 'Cantidad de ciclos en que se renueva la inversión',
	adicional: 'Monto adicional que se agrega en cada ciclo',
	resultado: 'Monto total al finalizar el último ciclo',
	resultadoNeto: 'Monto neto al finalizar el último ciclo (Resultado - Monto inicial)',
	resultadoCiclo: 'Indica una proyección de cuál sería el Monto neto invirtiendo el Monto final (Resultado) después de 1 ciclo más',
	tea: 'Tasa Efectiva Anual. Porcentaje de interés real basada en plazo y cantidad de ciclos proyectado a 365 días',
	tet: 'Tasa Efectiva Total. Porcentaje de interés real al final de la inversión'
}


// función que calcula el interés (ver la posibilidad de refactorizarla como función con recursión de cola)

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

// Se calcula el neto obtenido restando el monto inicial al resultado final


function textToNumObject(stringObject) {
	for (const prop in stringObject) {
		stringObject[prop] = textToNum(stringObject[prop]);
		if (isNaN(stringObject[prop])) { stringObject[prop] = 0 };
	}
	return stringObject;
}

function calHandleClick() {

	// Se obtienen los valores de obj y se los convierte a números

	const formValues = obtainDomValues(domObject); // OBJECT CON REFERENCIAS A ELEMENTOS DEL DOM
	const formNumValues = textToNumObject(formValues); // OBJECT CON NÚMEROS
	

	const retornoResultado = interes(formNumValues)
	// hasta aquí retornoResultado es number
	let retornoResultadoString = retornoResultado.toFixed(2); // aquí se convierte a strings
	retornoResultadoString = dotFormat(retornoResultadoString);

	const montoInicial = formNumValues.montoInicial;
	const tna = formNumValues.tna;
	const plazo = formNumValues.plazo;
	

	const resultadoCicloNum = interes({ montoInicial: retornoResultado, tna: tna, plazo: plazo, ciclos: 1, adicional: 0 });
	const resultadoCicloNumNet = resultadoCicloNum - retornoResultado;
	let resultadoCicloNumStr = resultadoCicloNumNet.toFixed(2);
	resultadoCicloNumStr = dotFormat(resultadoCicloNumStr);



	const netResultNum = (retornoResultado - montoInicial);
	let netResultStr = netResultNum.toFixed(2); 
	netResultStr = dotFormat(netResultStr);
	

	// let retornoResultadoCiclo = interes(values)
	// // hasta aquí retornoResultadoCiclo es number
	// retornoResultadoCiclo = retornoResultadoCiclo.toFixed(2); // aquí se convierte a strings
	// retornoResultadoCiclo = dotFormat(retorno);

	const resultado = document.getElementById('resultadoIn');
	const resultadoNeto = document.getElementById('resultadoNeto');
	const resultadoCiclo = document.getElementById('resultadoCiclo');


	render(resultado, retornoResultadoString);
	render(resultadoNeto, netResultStr);
	render(resultadoCiclo, resultadoCicloNumStr);
}


function obtainDomValues(values) {
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

// pasa texto a número y elimina los puntos

function textToNum(text) {
	const transitionText = text.replace(/\./g, '')
	const number = Number.parseFloat(transitionText);
	return number;
}

// formatea los números a texto con (.) como separador de miles

function dotFormat(text, dinamic = false) {

	const clearText = dinamic ? text.replace(/\./g, '') : text.replace(/\./, ',');
	const regex = /\B(?=(\d{3})+(?!\d))/g;
	const retorno = clearText.replace(regex, '.');

	return retorno;
}

function tooltipHandler(event) {
	
	let element;

	if (event.target.textContent === '?') {
		element = event.target.previousElementSibling.textContent;	
	} else {return;}
	
	
	switch (element) {
		case 'TNA %':
			alert(tooltipsObject.tna)
			break;
		case 'Monto Inicial':
			alert(tooltipsObject.inicial)
			break;
		case 'Plazo en días':
			alert(tooltipsObject.plazo)
			break;
		case 'Ciclos':
			alert(tooltipsObject.ciclos)
			break;
		case 'Adicional por Ciclo':
			alert(tooltipsObject.adicional)
			break;
		case 'Resultado':
			alert(tooltipsObject.resultado)
			break;

		case 'Resultado Neto':
			alert(tooltipsObject.resultadoNeto)
			break;

		case 'Resultado Neto en un Ciclo más':
			alert(tooltipsObject.resultadoCiclo)
			break;
	
		default:
			break;
	}
}

function inputHandler(event) {

	const id = event.target.id;
	const target = event.target;

	if (id === 'inicialIn' || id === 'adicionalIn') {
		let entero;
		let decimal;

		if (target.value.includes(",")) {
			entero = target.value.split(",")[0]
			decimal = target.value.split(",")[1]

			decimal = decimal.replace(/[^\d,]/g, '')
			decimal = decimal.replace(/(?<!\d),/g, '')
			decimal = decimal.replace(/,(?=\d+,)/g, '');
			decimal = "," + decimal;
		} else {
			entero = target.value
			decimal = "";
		}

		entero = dotFormat(entero, true);

		target.value = entero + decimal;

	} else if (id === 'tnaIn') {

		if (target.value.includes(".")) { target.value = target.value.replace(".", ",") }

		target.value = target.value.replace(/[^\d,]/g, '')
		target.value = target.value.replace(/(?<!\d),/g, '')
		target.value = target.value.replace(/,(?=\d+,)/g, '');

	} else {
		target.value = target.value.replace(/\D/g, '')
	}
}

function render(element, value) {
	element.value = value;
}


document.querySelector('.app').addEventListener('input', inputHandler);
document.querySelector('.app').addEventListener('click', tooltipHandler);
document.querySelector('#calcular').addEventListener('click', calHandleClick);
document.querySelector('#clear').addEventListener('click', clearHandleClick);



