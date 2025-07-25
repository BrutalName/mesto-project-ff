// Импорт

import '../pages/index.css'
import {createCard, deleteCard, addLike} from './card'
import {openPopup, closePopup} from './modal'
import {enableValidation, clearValidation} from './validation'
import {getProfileMe, createCardsList, pushApiProfileInfo, pushApiProfileAvatar, addApiNewCard, deleteApiCard, checkLikeApiCard, addLikeApiCard, remuveLikeApiCard } from './api'

// DOM узлы

const cardsList = document.querySelector('.places__list')
const logoElement = document.querySelector('.header__logo')
const logoAdress = new URL('../images/logo.svg', import.meta.url)

const profileAvatarСontainer = document.querySelector('.profile-avatar')
const avatarImage = document.querySelector('.profile__image')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const popupList = document.querySelectorAll('.popup')
const popupAvatar = document.querySelector('.popup_type_avatar')
const popupProfile = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const popupDeleteCard = document.querySelector('.popup_type_card-delete')

const popupImagePopup = document.querySelector('.popup_type_image')
const popupImage = popupImagePopup.querySelector('.popup__image')
const popupImageTextContent = popupImagePopup.querySelector('.popup__caption')

const formAvatar = document.forms['edit-avatar']
const linkInputAvatar = formAvatar['avatar']
const buttonSubmitformAvatar = formAvatar.querySelector('.popup__button')

const formProfile = document.forms['edit-profile']
const nameInputProfile = formProfile['name']
const descriptionInputProfile = formProfile['description']
const buttonSubmitformProfile = formProfile.querySelector('.popup__button')

const formPlace = document.forms['new-place']
const nameInputPlace = formPlace['place-name']
const linkInputPlace = formPlace['link']
const buttonSubmitformPlace = formPlace.querySelector('.popup__button')

const formDelete = document.forms['delete']
const buttonSubmitformDelete = formDelete.querySelector('.popup__button')

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')

const cardData = {
    cardsList: cardsList,
    deleteCard: deleteCard,
    addLike: addLike,
    addPopupImage: addPopupImage,
    addPopupDelete: addPopupDelete,
    checkLikeApiCard: checkLikeApiCard,
    addLikeApiCard: addLikeApiCard,
    remuveLikeApiCard: remuveLikeApiCard,
    createCard: createCard
}

const classСontainer = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}

// Лого

logoElement.src = logoAdress

// Открытие попов

editButton.addEventListener('click', () => {
    nameInputProfile.value = profileName.textContent
    descriptionInputProfile.value = profileDescription.textContent
    openPopup(popupProfile)
    clearValidation(formProfile, classСontainer)
})

addButton.addEventListener('click', () => {
    openPopup(popupNewCard)
})

profileAvatarСontainer.addEventListener('click', () => {
    openPopup(popupAvatar)
})

// Закрытие попов

popupList.forEach(function (popup) {

    closePopup (popup)

    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closePopup(evt.currentTarget)
    }})
    
})

// Обновление данных

formProfile.addEventListener('submit', handleFormSubmitProfile)

formPlace.addEventListener('submit', handleFormSubmitPlace)

formDelete.addEventListener('submit', handleFormSubmitDelete)

formAvatar.addEventListener('submit', handleNewAvatar)

//Функции

function addPopupImage (srcImg, textImg) {
    popupImageTextContent.textContent = textImg.textContent
    popupImage.src = srcImg.src
    popupImage.alt = textImg.textContent
    openPopup(popupImagePopup) 
}

function addPopupDelete () {
    openPopup(popupDeleteCard) 
}

function handleFormSubmitProfile (evt) {
    buttonSubmitformProfile.textContent = 'Сохранение...'
    evt.preventDefault()
    profileName.textContent = nameInputProfile.value
    profileDescription.textContent = descriptionInputProfile.value
    pushApiProfileInfo({name: nameInputProfile.value, about: descriptionInputProfile.value})
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        buttonSubmitformProfile.textContent = 'Сохранить'
    })
    formProfile.reset()
    closePopup(popupProfile)
}

function handleFormSubmitPlace (evt) {
    buttonSubmitformPlace.textContent = 'Сохранение...'
    evt.preventDefault()
    cardData.cardImg = linkInputPlace.value
    cardData.cardTitle = nameInputPlace.value
    cardData.likeCount = '0'
    cardData.cardId = '0'
    addApiNewCard({name: cardData.cardTitle, link: cardData.cardImg})
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            cardData.cardId = result._id
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            buttonSubmitformPlace.textContent = 'Сохранить'
        })
    cardsList.prepend(createCard(cardData))
    formPlace.reset()
    clearValidation(formPlace, classСontainer)
    closePopup(popupNewCard)
}

function handleFormSubmitDelete (evt) {
    buttonSubmitformDelete.textContent = 'Удаление...'
    evt.preventDefault()
    deleteApiCard(cardData.cardToDelete.id)
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSubmitformDelete.textContent = 'Да';
        })
    cardData.deleteCard(cardData.cardToDelete)
    closePopup(popupDeleteCard)
}

function handleNewAvatar (evt) {
    buttonSubmitformAvatar.textContent = 'Сохранение...'
    evt.preventDefault()
    avatarImage.style.backgroundImage = `url('${linkInputAvatar.value}')`
    pushApiProfileAvatar(linkInputAvatar.value)
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            buttonSubmitformAvatar.textContent = 'Сохранить'
        })
    formAvatar.reset()
    clearValidation(formAvatar, classСontainer)
    closePopup(popupAvatar)
}

//  Запуск

enableValidation(classСontainer)
getProfileMe()
.then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
})
.then((result, ) => {
    avatarImage.style.backgroundImage = `url('${result.avatar}')`
    profileName.textContent = result.name
    profileDescription.textContent = result.about
    cardData.myId = result._id
})
.catch((err) => {
    console.log(err)
})

createCardsList ()
.then(([cardsResponse, userDataResponse]) => {
    return Promise.all([cardsResponse.json(), userDataResponse.json()])
})
.then(([cards, userData]) => {
    cards.forEach((card) => {
        cardData.cardImg = card.link
        cardData.cardTitle = card.name
        cardData.likeCount = card.likes.length
        cardData.profileId = card.owner._id
        cardData.cardId = card._id
        cardData.ownerObject = userData.find((item) => {
            return item._id == cardData.profileId
        })
        const cardNew = cardData.createCard(cardData)
        if (!(cardData.myId == cardData.profileId)) {
            cardNew.querySelector('.card__delete-button').remove()
        }
        cardData.cardsList.append(cardNew)
    })
})    
.catch((err) => {
    console.log(err)
})
