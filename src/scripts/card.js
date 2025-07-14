const cardTempl = document.querySelector('#card-template').content
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')

export function createCard(cardImg, cardTitle, deleteCard, addLike, addPopupImage) {
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

export function deleteCard(element) {
  element.remove()
}

export function addLike (element) {
  element.classList.toggle('card__like-button_is-active');
};

export {editButton, addButton}

