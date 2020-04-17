/*
* @params 缓存key
*/ 
export function removeStore(key) {
    if (sessionStorage.getItem(key)) {
        sessionStorage.removeItem(key);
    }
}
export function getStore(key) {
    return sessionStorage.getItem(key) || '';
}
export function setStore(key, value) {
    if (typeof value == "object") {
        value = JSON.stringify(value);
    }
    sessionStorage.setItem(key, value);
}
export function removeLocalStore(key) {
    if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
    }
}
export function getLocalStore(key) {
    return localStorage.getItem(key) || '';
}
export function setLocalStore(key, value){
    if (typeof value == "object") {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
}

