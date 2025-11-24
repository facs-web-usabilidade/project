export function setLocalItem(key, value) {
    localStorage.setItem(key, value);
}

export function getLocalItem(key) {
    return localStorage.getItem(key);
}

export function removeLocalItem(key) {
    localStorage.removeItem(key)
}

export function clearLocalAll() {
    localStorage.clear();
}

const LocalFunctions = { setLocalItem, getLocalItem, removeLocalItem, clearLocalAll };

export default LocalFunctions;