const configApi = {
    httpsApi: `https://mesto.nomoreparties.co/v1/wff-cohort-42`,
    authorizationApi: "6b4b8cec-fb4f-465e-b4e0-f352e3747373",
};

// API

export function getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getProfileMe() {
    return fetch(`${configApi.httpsApi}/users/me`, {
        headers: {
            authorization: configApi.authorizationApi,
        },
    });
}

export function createCardsList() {
    return fetch(`${configApi.httpsApi}/cards`, {
        headers: {
            authorization: configApi.authorizationApi,
        },
    });
}

export function pushApiProfileInfo(obj) {
    return fetch(`${configApi.httpsApi}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: configApi.authorizationApi,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: obj.name,
            about: obj.about,
        }),
    });
}

export function pushApiProfileAvatar(avatar) {
    return fetch(`${configApi.httpsApi}/users/me/avatar`, {
        method: "PATCH",
        headers: {
            authorization: configApi.authorizationApi,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar: avatar,
        }),
    });
}

export function addApiNewCard(obj) {
    return fetch(`${configApi.httpsApi}/cards`, {
        method: "POST",
        headers: {
            authorization: configApi.authorizationApi,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: obj.name,
            link: obj.link,
        }),
    });
}

export function deleteApiCard(cardId) {
    return fetch(`${configApi.httpsApi}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: configApi.authorizationApi,
            "Content-Type": "application/json",
        },
    });
}

export function addLikeApiCard(cardId) {
    return fetch(`${configApi.httpsApi}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
            authorization: configApi.authorizationApi,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            _id: cardId,
        }),
    });
}

export function removeLikeApiCard(cardId) {
    return fetch(`${configApi.httpsApi}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: configApi.authorizationApi,
            "Content-Type": "application/json",
        },
    });
}
