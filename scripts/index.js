// @todo: Темплейт карточки

const cardTempl = document.querySelector('#card-template').content

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list')

// @todo: Функция создания карточки

function createCard(cardImg,cardTitle) {
    const cardElement = cardTempl.querySelector('.card').cloneNode(true)
    const cardElementImage = cardElement.querySelector('.card__image')
    const buttonDelete = cardElement.querySelector('.card__delete-button')

    cardElementImage.src = cardImg
    cardElementImage.alt = cardTitle
    cardElement.querySelector('.card__title').textContent = cardTitle

    buttonDelete.addEventListener('click', function () {
        elementDelete(cardElement)
    })

    return cardElement
}

// @todo: Функция удаления карточки

function elementDelete (element) {
    element.remove()
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (card) {
    const cardNew = createCard(card.link, card.name)
    cardsList.append(cardNew)
})