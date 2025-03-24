import { dotFormat } from "./parser.js";
import { tooltipsObject } from '../assets/tooltipsObject.js'

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