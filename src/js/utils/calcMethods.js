
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

export function rendimiento(ita, tet) {
  const porcentajeIta = ita / 100;

  const porcentajeTet = tet / 100;

  return (((1 + porcentajeTet) / (1 + porcentajeIta)) - 1) * 100
}

export function numAjustado(ita = 0, num) {
  return num / (1 + (ita / 100));
}

// MOVER FUNCION RENDER A ENVETSHANDLERS

export function render(element, value) {
  element.value = value;
}