function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res.json()
        .then((err) => {
            err.statusCode = res.status
            return Promise.reject(err);
        })
}
export function getIngredients () {
    return fetch('https://norma.nomoreparties.space/api/ingredients')
    .then(checkResponse())
    .then(res => console.log(res.data))
}