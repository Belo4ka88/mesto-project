export function editButtonStatusSave (button) {
        button.textContent = 'Сохранение...';
    }

export function editButtonStatusDefault (button,text) {
        button.textContent = text;
    }

export function getResponse (res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}