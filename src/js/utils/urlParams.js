
export function setUrlParams(params) {
  const url = new URL(window.location);
  for (const key in params) {

    if (params[key] == '0') {
      url.searchParams.delete(key);
    }
    else {

      url.searchParams.set(key, params[key]);
    }


  }

  window.history.pushState({}, '', url);
}


export function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const obj = {};
  for (let key of params.keys()) {

    if (params.get(key) != '0') {

      obj[key] = params.get(key);
    }

  }

  
  return obj;
}