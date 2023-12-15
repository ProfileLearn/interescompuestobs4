/* 
No declarar tantas veces las mismas variables o referencias al DOM
Refactorizar
*/

import { interes, textToNumObject, obtainDomValues, clear, dotFormat, tooltipHandler, inputHandler, render, numAjustado, teayt, rendimiento, handleViewMore } from './methods.js'


// Crea objetos con referencias a los elementos del formulario

const primaryDomObject = {
	tna: document.getElementById('tnaIn'),
	montoInicial: document.getElementById('inicialIn'),
	plazo: document.getElementById('plazoIn'),
	ciclos: document.getElementById('ciclosIn'),
	adicional: document.getElementById('adicionalIn'),
	inflacion: document.getElementById('inflacionIn')
}

const secDomObject = {
	appForm: document.getElementsByClassName('app')[0],
	advanceOptions: document.getElementById('advance-options'),
	viewMore: document.getElementById('ver-mas'),
	calculate: document.getElementById('calcular'),
	clear: document.getElementById('clear')
}

const thrDomObject = {
	resultado: document.getElementById('resultadoIn'),
	resultadoNeto: document.getElementById('resultadoNeto'),
	resultadoCiclo: document.getElementById('resultadoCiclo')
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

	const formValues = obtainDomValues(primaryDomObject); // OBJECT CON REFERENCIAS A ELEMENTOS DEL DOM

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


	render(thrDomObject.resultado, retornoResultadoString);
	render(thrDomObject.resultadoNeto, netResultStr);
	render(thrDomObject.resultadoCiclo, resultadoCicloNumStr);
}


secDomObject.appForm.addEventListener('input', inputHandler);
secDomObject.appForm.addEventListener('click', tooltipHandler);
secDomObject.advanceOptions.addEventListener('change', (event) => {

	primaryDomObject.inflacion.value = "";

	if (!event.target.checked) {
		resultadoCiclo.parentNode.parentNode.classList.add('oculto');

		primaryDomObject.inflacion.parentNode.parentNode.classList.add('oculto');

		secDomObject.viewMore.parentNode.parentNode.classList.add('oculto');

		if (primaryDomObject.tna.value && primaryDomObject.plazo.value && primaryDomObject.ciclos.value && primaryDomObject.montoInicial.value) {

			const manualCalculate = new Event('click');

			secDomObject.calculate.dispatchEvent(manualCalculate);
		}


	} else {
		resultadoCiclo.parentNode.parentNode.classList.remove('oculto');
		primaryDomObject.inflacion.parentNode.parentNode.classList.remove('oculto');
		secDomObject.viewMore.parentNode.parentNode.classList.remove('oculto');

	}

})

secDomObject.viewMore.addEventListener('click', () => handleViewMore(thrDomObject.resultado, porcentajes, primaryDomObject));

secDomObject.calculate.addEventListener('click', calHandleClick);
secDomObject.clear.addEventListener('click', () => clear(primaryDomObject));



