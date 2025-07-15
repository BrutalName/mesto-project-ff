// Импорт

import '../pages/index.css'
import cards from './cards'
import {createCard, deleteCard, addLike} from './card'
import {openPopup, closePopup} from './modal'

// DOM узлы

const cardsList = document.querySelector('.places__list')
const logoElement = document.querySelector('.header__logo')
const avatarElement = document.querySelector('.profile__image')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const logoAdress = new URL('../images/logo.svg', import.meta.url)
const avatarAdress = new URL('../images/avatar.jpg', import.meta.url)
const popupList = document.querySelectorAll('.popup')
const popupEdit = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const formProfile = document.forms['edit-profile']
const formPlace = document.forms['new-place']
const popupImagePopup = document.querySelector('.popup_type_image')
const popupImage = popupImagePopup.querySelector('.popup__image')
const popupImageTextContent = popupImagePopup.querySelector('.popup__caption')
const nameInputProfile = formProfile['name']
const descriptionInputProfile = formProfile['description']
const nameInputPlace = formPlace['place-name']
const linkInputPlace = formPlace['link']
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const cardData = {
    deleteCard: deleteCard, addLike: addLike, addPopupImage: addPopupImage
}

// Лого

logoElement.src = logoAdress
avatarElement.style.backgroundImage = `url('${avatarAdress}')`

// Начальные карты

cards.initialCards.forEach(function (card) {
    cardData.cardImg = card.link
    cardData.cardTitle = card.name
    const cardNew = createCard(cardData)
    cardsList.append(cardNew)
})

// Открытие попов

editButton.addEventListener('click', () => {
    nameInputProfile.value = profileName.textContent
    descriptionInputProfile.value = profileDescription.textContent
    openPopup(popupEdit)
})

addButton.addEventListener('click', () => {
    openPopup(popupNewCard)
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

//Функции

function addPopupImage (srcImg, textImg) {
    popupImageTextContent.textContent = textImg.textContent
    popupImage.src = srcImg.src
    popupImage.alt = textImg.textContent
    openPopup(popupImagePopup) 
}

function handleFormSubmitProfile (evt) {
    evt.preventDefault()
    profileName.textContent = nameInputProfile.value
    profileDescription.textContent = descriptionInputProfile.value
    formProfile.reset()
    closePopup(popupEdit)
}

function handleFormSubmitPlace (evt) {
    evt.preventDefault()
    cardData.cardImg = linkInputPlace.value
    cardData.cardTitle = nameInputPlace.value
    cardsList.prepend(createCard(cardData))
    formPlace.reset()
    closePopup(popupNewCard)
}