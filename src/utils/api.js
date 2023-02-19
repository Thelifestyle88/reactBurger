const baseUrl = 'https://norma.nomoreparties.space/api'

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

export function getIngredients() {
    return fetch(`${baseUrl}/ingredients`)
    .then(checkResponse)
}

export function sendOrder(ingredients) {
    return fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { ingredients: ingredients } ) 
    })
    .then(checkResponse)
}