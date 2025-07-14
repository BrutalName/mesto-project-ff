// Импорт

import '../pages/index.css'
import cards from './cards'
import {createCard, deleteCard, addLike, editButton, addButton} from './card'
import {openPop, closePop, formProfile, formPlace, addPopupImage, popupALL, popupEdit, popupNewCard, nameInputProfile, descriptionInputProfile, nameInputPlace, linkInputPlace} from './modal'

// DOM узлы

const page = document.querySelector('.page')
const cardsList = document.querySelector('.places__list')
const logoElement = document.querySelector('.header__logo')
const avatarElement = document.querySelector('.profile__image')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const logoAdress = new URL('../images/logo.svg', import.meta.url)
const avatarAdress = new URL('../images/avatar.jpg', import.meta.url)

// Лого

logoElement.src = logoAdress
avatarElement.style.backgroundImage = `url('${avatarAdress}')`

// Начальные карты

cards.initialCards.forEach(function (card) {
    const cardNew = createCard(card.link, card.name, deleteCard, addLike, addPopupImage)
    cardsList.append(cardNew)
})

// Открытие попов

editButton.addEventListener('click', () => {
    openPop(popupEdit)
})

addButton.addEventListener('click', () => {
    openPop(popupNewCard)
})

// Закрытие попов

popupALL.forEach(function (popup) {

    popup.classList.add('popup_is-animated')

    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closePop(evt.currentTarget)
    }})
    page.addEventListener('keydown', (evt) => {
        if ((evt.key === 'Escape')) {
            closePop(popup)
    }})  
})

// Обновление данных

formProfile.addEventListener('submit', (evt) => {
    evt.preventDefault()
    profileName.textContent = nameInputProfile.value
    profileDescription.textContent = descriptionInputProfile.value
    closePop(popupEdit)
})

formPlace.addEventListener('submit', (evt) => {
    evt.preventDefault()
    cardsList.prepend(createCard(linkInputPlace.value, nameInputPlace.value, deleteCard, addLike, addPopupImage))
    closePop(popupNewCard)
})