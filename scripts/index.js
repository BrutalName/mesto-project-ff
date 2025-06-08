// @todo: Темплейт карточки

const CardTempl = document.querySelector('#card-template').content

// @todo: DOM узлы

const CardsList = document.querySelector('.places__list')

// @todo: Функция создания карточки

function addCard(CardImg,CardTitle) {
    const CardTemplClone = CardTempl.querySelector('.card').cloneNode(true)
    const ButtonDelete = CardTemplClone.querySelector('.card__delete-button')

    CardTemplClone.querySelector('.card__image').src = CardImg
    CardTemplClone.querySelector('.card__image').alt = CardTitle
    CardTemplClone.querySelector('.card__title').textContent = CardTitle

    ButtonDelete.addEventListener('click', CardDelete)
    
    CardsList.append(CardTemplClone);
}

// @todo: Функция удаления карточки

function CardDelete (evt) {
    const TargetCard = evt.target.parentElement
    TargetCard.remove()
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (Card) {
    addCard(Card.link, Card.name)
})