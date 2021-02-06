
const obj = {
	tna: document.getElementById('tnaIn'),
	montoInicial: document.getElementById('inicialIn'),
	plazo: document.getElementById('plazoIn'),
	ciclos: document.getElementById('renovIn'),
	adicional: document.getElementById('adicionalIn'),
	resultado: document.getElementById('resultadoIn')
}


function interes(montoInicial, tna, plazo, ciclos, adicional=0) 
	{	
		const tnaPorDia = ((tna / 365) / 100);
		adicional *= 1;
		let resParcial = (montoInicial) * ((tnaPorDia * plazo) + 1);
		resParcial += adicional;
		if (ciclos > 1) 
		{	
			return interes(resParcial, tna, plazo, --ciclos, adicional);
		} 
		return resParcial;
	};
//funcion

function calHandleClick(e) {
	let {montoInicial, tna, plazo, ciclos, resultado, adicional} = obj;
	ciclos.value = ciclos.value < 1 ? 1 : ciclos.value;
	resultado.value = interes(montoInicial.value, tna.value, plazo.value, ciclos.value, adicional.value);

}

function clearHandleClick() {
	for (prop in obj) {
		obj[prop].value = "";
	}
}

document.querySelector('#calcular').addEventListener('click', calHandleClick);
document.querySelector('#clear').addEventListener('click', clearHandleClick);