'use strict';

// Acceso al DOM

let tna = document.querySelector('#tnaIn');
let montoInicial = document.querySelector('#inicialIn');
let plazo = document.querySelector('#plazoIn');
let ciclos = document.querySelector('#renovIn');
let resultado = document.querySelector('#resultadoIn');
let btn = document.querySelector('#calcular');
let btnClear = document.querySelector('#clear');

// Variables

let tnaVal;
let montoInicialVal;
let plazoVal;										// ESTUDIAR BIEN AMBITO DE FUNCIONES, VARIABLES, RETORNOS
let ciclosVal;										// FUNCIONES ANONIMAS Y DE FLECHA
let resParcial;

//funcion
function saveValue()
{
	
	tnaVal = tna.value;
	montoInicialVal = montoInicial.value;
	plazoVal = plazo.value;
	if (ciclos.value < 1) {ciclos.value = 1};
 	ciclosVal = ciclos.value;
	interes(montoInicialVal, tnaVal, plazoVal, --ciclosVal);
	resultado.value = resParcial;

}

function interes(montoInicial, tna, plazo, ciclos) 
{
	let tnaPorDia = ((tna / 365) / 100);
	resParcial = montoInicial * ((tnaPorDia * plazo) + 1);
	console.log(resParcial + ' resultado parcial');
	console.log(ciclos + ' ciclos antes de --');

	if (ciclos > 0)
	{
		//ciclos--;
		console.log(ciclos + ' ciclos desp --');
		interes(resParcial, tna, plazo, --ciclos);
	}
	else {
		return resParcial;
	}		
};

btn.addEventListener ('click', function(){saveValue()});
btnClear.addEventListener('click', function(){
	tna.value = '';
	montoInicial.value = '';
	plazo.value = '';
	ciclos.value = '';
	resultado.value = '';
});