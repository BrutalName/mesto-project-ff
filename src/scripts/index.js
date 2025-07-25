// Импорт

import "../pages/index.css";
import { createCard, deleteCard, addLike } from "./card";
import { openPopup, closePopup } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import { getResponseData, getProfileMe, createCardsList, pushApiProfileInfo, pushApiProfileAvatar, addApiNewCard, deleteApiCard, addLikeApiCard, removeLikeApiCard } from "./api";

// DOM узлы

const cardsList = document.querySelector(".places__list");
const logoElement = document.querySelector(".header__logo");
const logoAdress = new URL("../images/logo.svg", import.meta.url);

const profileAvatarСontainer = document.querySelector(".profile-avatar");
const avatarImage = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupList = document.querySelectorAll(".popup");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupDeleteCard = document.querySelector(".popup_type_card-delete");

const popupImagePopup = document.querySelector(".popup_type_image");
const popupImage = popupImagePopup.querySelector(".popup__image");
const popupImageTextContent = popupImagePopup.querySelector(".popup__caption");

const formAvatar = document.forms["edit-avatar"];
const linkInputAvatar = formAvatar["avatar"];
const buttonSubmitformAvatar = formAvatar.querySelector(".popup__button");

const formProfile = document.forms["edit-profile"];
const nameInputProfile = formProfile["name"];
const descriptionInputProfile = formProfile["description"];
const buttonSubmitformProfile = formProfile.querySelector(".popup__button");

const formPlace = document.forms["new-place"];
const nameInputPlace = formPlace["place-name"];
const linkInputPlace = formPlace["link"];
const buttonSubmitformPlace = formPlace.querySelector(".popup__button");

const formDelete = document.forms["delete"];
const buttonSubmitformDelete = formDelete.querySelector(".popup__button");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const cardData = {
    cardsList: cardsList,
    deleteCard: deleteCard,
    addLike: addLike,
    addPopupImage: addPopupImage,
    addPopupDelete: addPopupDelete,
    addLikeApiCard: addLikeApiCard,
    removeLikeApiCard: removeLikeApiCard,
    createCard: createCard,
    getResponseData: getResponseData,
};

const classСontainer = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

// Лого

logoElement.src = logoAdress;

// Открытие попов

editButton.addEventListener("click", () => {
    nameInputProfile.value = profileName.textContent;
    descriptionInputProfile.value = profileDescription.textContent;
    clearValidation(formProfile, classСontainer);
    openPopup(popupProfile);
});

addButton.addEventListener("click", () => {
    formPlace.reset();
    clearValidation(formPlace, classСontainer);
    openPopup(popupNewCard);
});

profileAvatarСontainer.addEventListener("click", () => {
    formAvatar.reset();
    clearValidation(formAvatar, classСontainer);
    openPopup(popupAvatar);
});

// Закрытие попов

popupList.forEach(function (popup) {
    closePopup(popup);

    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
            closePopup(evt.currentTarget);
        }
    });
});

// Обновление данных

formProfile.addEventListener("submit", handleFormSubmitProfile);

formPlace.addEventListener("submit", handleFormSubmitPlace);

formDelete.addEventListener("submit", handleFormSubmitDelete);

formAvatar.addEventListener("submit", handleNewAvatar);

//Функции

function addPopupImage(srcImg, textImg) {
    popupImageTextContent.textContent = textImg.textContent;
    popupImage.src = srcImg.src;
    popupImage.alt = textImg.textContent;
    openPopup(popupImagePopup);
}

function addPopupDelete() {
    openPopup(popupDeleteCard);
}

function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    pushApiProfileInfo({ name: nameInputProfile.value, about: descriptionInputProfile.value })
        .then((res) => getResponseData(res))
        .then(() => {
            buttonSubmitformProfile.textContent = "Сохранение...";
            profileName.textContent = nameInputProfile.value;
            profileDescription.textContent = descriptionInputProfile.value;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSubmitformProfile.textContent = "Сохранить";
            formProfile.reset();
            closePopup(popupProfile);
        });
}

function handleFormSubmitPlace(evt) {
    evt.preventDefault();
    addApiNewCard({ name: cardData.cardTitle, link: cardData.cardImg })
        .then((res) => getResponseData(res))
        .then((result) => {
            cardData.cardImg = linkInputPlace.value;
            cardData.cardTitle = nameInputPlace.value;
            buttonSubmitformPlace.textContent = "Сохранение...";
            cardData.likeCount = result.likes.length;
            cardData.cardId = result._id;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            formPlace.reset();
            cardsList.prepend(createCard(cardData));
            buttonSubmitformPlace.textContent = "Сохранить";
            closePopup(popupNewCard);
        });
}

function handleFormSubmitDelete(evt) {
    evt.preventDefault();
    deleteApiCard(cardData.cardToDelete.id)
        .then((res) => getResponseData(res))
        .then(() => {
            buttonSubmitformDelete.textContent = "Удаление...";
        })
        .then(() => {
            cardData.deleteCard(cardData.cardToDelete);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSubmitformDelete.textContent = "Да";
            closePopup(popupDeleteCard);
        });
}

function handleNewAvatar(evt) {
    evt.preventDefault();
    pushApiProfileAvatar(linkInputAvatar.value)
        .then((res) => getResponseData(res))
        .then(() => {
            buttonSubmitformAvatar.textContent = "Сохранение...";

            avatarImage.style.backgroundImage = `url('${linkInputAvatar.value}')`;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            formAvatar.reset();
            buttonSubmitformAvatar.textContent = "Сохранить";
            closePopup(popupAvatar);
        });
}

//  Запуск

enableValidation(classСontainer);

Promise.all([getProfileMe(), createCardsList()])
    .then(([profileResponse, cardsResponse]) => {
        if (profileResponse.ok && cardsResponse.ok) {
            return Promise.all([profileResponse.json(), cardsResponse.json()]);
        }
        return Promise.reject(`Ошибка`);
    })
    .then(([profileData, cardsData]) => {
        avatarImage.style.backgroundImage = `url('${profileData.avatar}')`;
        profileName.textContent = profileData.name;
        profileDescription.textContent = profileData.about;
        cardData.myId = profileData._id;
        cardData.listILike = {};
        cardsData.forEach((card) => {
            card.likes.forEach((likes) => {
                if (cardData.myId == likes._id) {
                    const _id = card._id;
                    cardData.listILike[_id] = card;
                }
            });
        });
        return cardsData;
    })
    .then((cards) => {
        cards.forEach((card) => {
            cardData.cardImg = card.link;
            cardData.cardTitle = card.name;
            cardData.likeCount = card.likes.length;
            cardData.profileId = card.owner._id;
            cardData.cardId = card._id;

            const cardNew = cardData.createCard(cardData);
            if (!(cardData.myId == cardData.profileId)) {
                cardNew.querySelector(".card__delete-button").remove();
            }
            cardData.cardsList.append(cardNew);
        });
    })
    .catch((err) => {
        console.log(err);
    });
