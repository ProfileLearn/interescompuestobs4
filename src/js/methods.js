import { tooltipsObject } from "./assets/tooltips_object.js";
import { dotFormat } from "./utils/parser.js";

// función que calcula el interés (ver la posibilidad de refactorizarla como función con recursión de cola)

export function interes({ montoInicial, tna, plazo, ciclos, adicional }) {
  const tnaPorDia = ((tna / 365) / 100);
  adicional *= 1;
  let resParcial = (montoInicial) * ((tnaPorDia * plazo) + 1);
  resParcial += adicional;
  if (ciclos > 1) {
    return interes({ montoInicial: resParcial, tna, plazo, ciclos: ciclos - 1, adicional });
  }
  return resParcial;
};

export function teayt(tna, plazo, ciclos) {
  // fórmula = (((1+((tna÷100)÷(días_del_año / plazo)))^ciclos)−1)×100

  const tea = 100 * (Math.pow(1 + ((tna / 100) / 12), 12) - 1)

  const tet = 100 * (Math.pow(1 + ((tna / 100) / (365 / plazo)), ciclos) - 1)

  return { tea, tet }
}

// Se calcula el neto obtenido restando el monto inicial al resultado final

// pasa texto a número y elimina los puntos

// function textToNum(text) {
//   let transitionText = text.replace(/\./g, '')
//   transitionText = transitionText.replace(',', '.')
//   const number = Number.parseFloat(transitionText);
//   return number;
// }

// export function textToNumObject(stringObject) {
//   for (const prop in stringObject) {
//     stringObject[prop] = textToNum(stringObject[prop]);
//     if (isNaN(stringObject[prop])) { stringObject[prop] = 0 };
//   }
//   return stringObject;
// }

export function obtainDomValues(values) {
  const objValues = {};
  for (const prop in values) {

    objValues[prop] = values[prop].value;

  }
  
  return objValues;
}

export function clear(obj) {
  for (const prop in obj) {
    obj[prop].value = "";
  }
}


// formatea los números a texto con (.) como separador de miles

// export function dotFormat(text, dinamic = false) {

//   const clearText = dinamic ? text.replace(/\./g, '') : text.replace(/\./, ',');
//   const regex = /\B(?=(\d{3})+(?!\d))/g;
//   const retorno = clearText.replace(regex, '.');

//   return retorno;
// }

export function tooltipHandler(event) {

  let element;

  if (event.target.textContent === '?') {
    element = event.target.previousElementSibling.textContent;
  } else { return; }


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
    case 'Inflación Acumulada %':
      alert(tooltipsObject.ita)
      break;
    case 'Resultado':
      alert(tooltipsObject.resultado)
      break;

    case 'Resultado Neto':
      alert(tooltipsObject.resultadoNeto)
      break;

    case 'Retorno Posterior por Ciclo':
      alert(tooltipsObject.resultadoCiclo)
      break;

    default:
      break;
  }
}

export function handleViewMore(resultado, porcentajes, primaryDomObject) {

  if (resultado.value) {

    alert
      (`Tasa Efectiva Anual: ${porcentajes.tasasEfectivas.tea} %\nTasa Efectiva Total x ${primaryDomObject.ciclos.value} ciclos de ${primaryDomObject.plazo.value} días: ${porcentajes.tasasEfectivas.tet} %\nRendimiento Ajustado: ${porcentajes.rendimientoInversion} %`)

  } else {
    alert('Debes hacer un cálculo primero')
  }
}

export function inputHandler(event) {

  const id = event.target.id;
  const target = event.target;

  //la siguiente línea no altera a target.value

  let retorno = target.value.replace(/[^\d,\.]/, "");

  retorno = retorno.replace(/^[,\.]/, "0,");

  if (id === 'inicialIn' || id === 'adicionalIn') {

    let entero;
    let decimal;

    if (retorno.includes(",")) {

      entero = retorno.split(",")[0];
      decimal = retorno.split(",")[1];

      decimal = decimal.replace(".", "");

      decimal = "," + decimal.slice(0, 2);

    } else {

      entero = retorno;

    }

    entero = dotFormat(entero, true);

    //elimina todo lo que no sea un número o una coma de decimal

    retorno = decimal ? entero + decimal : entero;

  } else if (id === 'tnaIn') {

    retorno = retorno.replace(".", ",")

    let entero;
    let decimal;

    if (retorno.includes(",")) {

      entero = retorno.split(",")[0];
      decimal = retorno.split(",")[1];

      decimal = decimal.replace(".", "");

      decimal = "," + decimal.slice(0, 2);

    } else {

      entero = retorno;

    }

    //elimina todo lo que no sea un número o una coma de decimal

    retorno = decimal ? entero + decimal : entero;

    retorno = retorno.replace(/[^\d,]/g, '');

  } else if (id === 'inflacionIn') {

    retorno = retorno.replace(".", ",")

    let entero;
    let decimal;

    if (retorno.includes(",")) {

      entero = retorno.split(",")[0];
      decimal = retorno.split(",")[1];

      decimal = decimal.replace(".", "");

      decimal = "," + decimal.slice(0, 2);

    } else {

      entero = retorno;

    }

    //elimina todo lo que no sea un número o una coma de decimal

    retorno = decimal ? entero + decimal : entero;

    retorno = retorno.replace(/[^\d,]/g, '');


  } else {
    retorno = retorno.replace(/\D/g, '')
  }

  target.value = retorno;

}

export function rendimiento(ita, tet) {
  const porcentajeIta = ita / 100;

  const porcentajeTet = tet / 100;

  return (((1 + porcentajeTet) / (1 + porcentajeIta)) - 1) * 100
}

export function numAjustado(ita = 0, num) {
  return num / (1 + (ita / 100));
}

export function render(element, value) {
  element.value = value;
}