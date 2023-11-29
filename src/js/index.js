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

import { interes, textToNumObject, obtainDomValues, clear, dotFormat, tooltipHandler, inputHandler, render, numAjustado, teayt, rendimiento } from './methods.js'


// Crea un objeto con referencias a los elementos del formulario

const domObject = {
	tna: document.getElementById('tnaIn'),
	montoInicial: document.getElementById('inicialIn'),
	plazo: document.getElementById('plazoIn'),
	ciclos: document.getElementById('ciclosIn'),
	adicional: document.getElementById('adicionalIn'),
	inflacion: document.getElementById('inflacionIn')
}

export const tooltipsObject = {
	tna: 'Tasa Nominal Anual. Porcentaje de interés a 365 días, sin tocar la inversión',
	inicial: 'Monto inicial a invertir',
	plazo: 'Cantidad de días que dura el ciclo de inversión',
	ciclos: 'Cantidad de ciclos en que se renueva la inversión',
	adicional: 'Monto adicional que se agrega en cada ciclo',
	ita: 'Inflación Total Acumulada al terminar el último ciclo (estimación)',
	resultado: 'Monto total al finalizar el último ciclo',
	resultadoNeto: 'Monto neto al finalizar el último ciclo (Resultado - Monto inicial)',
	resultadoCiclo: 'Indica una proyección de cuál sería el Monto neto invirtiendo el Monto final (Resultado) después de 1 ciclo más',
	tea: 'Tasa Efectiva Anual. Porcentaje de interés real basada en plazo y cantidad de ciclos proyectado a 365 días',
	tet: 'Tasa Efectiva Total. Porcentaje de interés real al final de la inversión'
}

const porcentajes = {};


function calHandleClick() {

	// Se obtienen los valores de obj y se los convierte a números

	const formValues = obtainDomValues(domObject); // OBJECT CON REFERENCIAS A ELEMENTOS DEL DOM
	const formNumValues = textToNumObject(formValues); // OBJECT CON NÚMEROS

	const inflacion = formNumValues.inflacion;

	porcentajes.tasasEfectivas = teayt(formNumValues.tna, formNumValues.plazo, formNumValues.ciclos);

	porcentajes.rendimientoInversion = rendimiento(formNumValues.inflacion, porcentajes.tasasEfectivas.tet).toFixed(2);

	porcentajes.tasasEfectivas.tea = (porcentajes.tasasEfectivas.tea).toFixed(2)
	porcentajes.tasasEfectivas.tet = (porcentajes.tasasEfectivas.tet).toFixed(2)

	let retornoResultado = interes(formNumValues);

	retornoResultado = numAjustado(inflacion, retornoResultado)

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


	const resultado = document.getElementById('resultadoIn');
	const resultadoNeto = document.getElementById('resultadoNeto');
	const resultadoCiclo = document.getElementById('resultadoCiclo');


	render(resultado, retornoResultadoString);
	render(resultadoNeto, netResultStr);
	render(resultadoCiclo, resultadoCicloNumStr);
}





document.querySelector('.app').addEventListener('input', inputHandler);
document.querySelector('.app').addEventListener('click', tooltipHandler);
document.getElementById('advance-options').addEventListener('change', (event) => {

	domObject.inflacion.value = "";

	if (!event.target.checked) {
		resultadoCiclo.parentNode.parentNode.classList.add('oculto');

		domObject.inflacion.parentNode.parentNode.classList.add('oculto');

		document.getElementById('ver-mas').parentNode.parentNode.classList.add('oculto');

		if (domObject.tna.value && domObject.plazo.value && domObject.ciclos.value && domObject.montoInicial.value) {

			const manualCalculate = new Event('click');

			document.getElementById('calcular').dispatchEvent(manualCalculate);
		}


	} else {
		resultadoCiclo.parentNode.parentNode.classList.remove('oculto');
		domObject.inflacion.parentNode.parentNode.classList.remove('oculto');
		document.getElementById('ver-mas').parentNode.parentNode.classList.remove('oculto');

	}

})

document.getElementById('ver-mas').addEventListener('click', () => {
	alert
		(`Tasa Efectiva Anual: ${porcentajes.tasasEfectivas.tea} %\nTasa Efectiva Total x ${domObject.ciclos.value} ciclos de ${domObject.plazo.value} días: ${porcentajes.tasasEfectivas.tet} %\nRendimiento Ajustado: ${porcentajes.rendimientoInversion} %`)
});

document.getElementById('calcular').addEventListener('click', calHandleClick);
document.getElementById('clear').addEventListener('click', () => clear(domObject));



