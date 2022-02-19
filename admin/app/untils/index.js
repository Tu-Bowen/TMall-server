function debounce(func, wait, params = []) {
    let timer;
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, params)
        }, wait)
    }
}
function setStore(name, content) {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}
function getStore(name) {
    if (!name) return;
    return window.localStorage.getItem(name);
}
function removeStore(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
}