const cardTempl = document.querySelector('#card-template').content

export function createCard(cardData) {
  const cardElement = cardTempl.querySelector('.card').cloneNode(true)
  const cardElementImage = cardElement.querySelector('.card__image')
  const cardElementTitle = cardElement.querySelector('.card__title')
  const buttonLike = cardElement.querySelector('.card__like-button')
  const buttonDelete = cardElement.querySelector('.card__delete-button')

  cardElementImage.src = cardData.cardImg
  cardElementImage.alt = cardData.cardTitle
  cardElementTitle.textContent = cardData.cardTitle

  cardElementImage.addEventListener('click', () => {
    cardData.addPopupImage(cardElementImage, cardElementTitle);
  });

  buttonLike.addEventListener('click', () => {
    cardData.addLike(buttonLike)
  })
  
  buttonDelete.addEventListener('click', () => {
    cardData.deleteCard(cardElement)
  })

  return cardElement
}

export function deleteCard(element) {
  element.remove()
}

export function addLike (element) {
  element.classList.toggle('card__like-button_is-active');
};