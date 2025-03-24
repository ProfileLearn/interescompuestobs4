export function dotFormat(text, dinamic = false) {

  const clearText = dinamic ? text.replace(/\./g, '') : text.replace(/\./, ',');
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const retorno = clearText.replace(regex, '.');

  return retorno;
}

export function textToNumObject(stringObject) {

  function textToNum(text) {
    let transitionText = text.replace(/\./g, '')
    transitionText = transitionText.replace(',', '.')
    const number = Number.parseFloat(transitionText);
    return number;
  }

  for (const prop in stringObject) {
    stringObject[prop] = textToNum(stringObject[prop]);
    if (isNaN(stringObject[prop])) { stringObject[prop] = 0 };
  }
  return stringObject;
}