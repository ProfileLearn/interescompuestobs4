
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
    obj[key] = params.get(key);
  }

  console.log(obj);
  return obj;
}