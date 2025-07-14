import '../pages/index.css';
import cards from './cards';

// DOM узлы

const page = document.querySelector('.page')
const cardTempl = document.querySelector('#card-template').content
const cardsList = document.querySelector('.places__list')
const logoElement = document.querySelector('.header__logo')
const avatarElement = document.querySelector('.profile__image')
const popupALL = document.querySelectorAll('.popup')
const popupEdit = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const popupImagePop = document.querySelector('.popup_type_image')
const popupImage = popupImagePop.querySelector('.popup__image')
const popupImageTextContent = popupImagePop.querySelector('.popup__caption')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const formProfile = document.forms['edit-profile']
const formPlace = document.forms['new-place']
const nameInputProfile = formProfile['name']
const descriptionInputProfile = formProfile['description']
const nameInputPlace = formPlace['place-name']
const linkInputPlace = formPlace['link']

// Фото профиля

const logoAdress = new URL('../images/logo.svg', import.meta.url)
const avatarAdress = new URL('../images/avatar.jpg', import.meta.url)
logoElement.src = logoAdress
avatarElement.style.backgroundImage = `url('${avatarAdress}')`

// Функция создания карточки

function createCard(cardImg, cardTitle, deleteCard, addLike, addPopupImage) {
    const cardElement = cardTempl.querySelector('.card').cloneNode(true)
    const cardElementImage = cardElement.querySelector('.card__image')
    const cardElementTitle = cardElement.querySelector('.card__title')
    const buttonLike = cardElement.querySelector('.card__like-button')
    const buttonDelete = cardElement.querySelector('.card__delete-button')

    cardElementImage.src = cardImg
    cardElementImage.alt = cardTitle
    cardElementTitle.textContent = cardTitle

    cardElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__image')) {
            addPopupImage(cardElementImage, cardElementTitle)
        }
    })

    buttonLike.addEventListener('click', () => {
        addLike(buttonLike)
    })
    
    buttonDelete.addEventListener('click', () => {
        deleteCard(cardElement)
    })

    return cardElement
}

function addPopupImage (srcImg, textImg) {
    popupImageTextContent.textContent = textImg.textContent
    popupImage.src = srcImg.src
    popupImage.alt = textImg.alt
    openPop(popupImagePop) 
};

// Функция удаления карточки

function deleteCard(element) {
    element.remove()
}

// Функции

function openPop (element) {
    //element.style.display = 'flex'
    element.classList.add('popup_is-opened')
    element.classList.remove('popup_is-animated')
};

function closePop (element) {
    formProfile.reset()
    formPlace.reset()
    element.classList.add('popup_is-animated')
    element.classList.remove('popup_is-opened')
    //element.style.display = 'none'
};

function addLike (element) {
    element.classList.toggle('card__like-button_is-active');
};

// Вывести карточки на страницу

cards.initialCards.forEach(function (card) {
    const cardNew = createCard(card.link, card.name, deleteCard, addLike, addPopupImage)
    cardsList.append(cardNew)
})

editButton.addEventListener('click', () => {
    openPop(popupEdit)
});

addButton.addEventListener('click', () => {
    openPop(popupNewCard)
});

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
});

formProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInputProfile.value
    profileDescription.textContent = descriptionInputProfile.value
    closePop(popupEdit)
});

formPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    cardsList.prepend(createCard(linkInputPlace.value, nameInputPlace.value, deleteCard, addLike, addPopupImage))
    closePop(popupNewCard)
}); 