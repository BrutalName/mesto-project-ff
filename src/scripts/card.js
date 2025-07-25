const cardTempl = document.querySelector('#card-template').content

export function createCard(cardData) {
  const cardElement = cardTempl.querySelector('.card').cloneNode(true)
  const cardElementImage = cardElement.querySelector('.card__image')
  const cardElementTitle = cardElement.querySelector('.card__title')
  const buttonLike = cardElement.querySelector('.card__like-button')
  const likeCount = cardElement.querySelector('.card__like-count')
  const buttonDelete = cardElement.querySelector('.card__delete-button')

  cardElement.id = cardData.cardId
  cardElementImage.src = cardData.cardImg
  cardElementImage.alt = cardData.cardTitle
  cardElementTitle.textContent = cardData.cardTitle
  likeCount.textContent = cardData.likeCount
  cardElement.owner = cardData.ownerObject

  cardElementImage.addEventListener('click', () => {
    cardData.addPopupImage(cardElementImage, cardElementTitle)
  });

  cardData.checkLikeApiCard()
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    const card = result.find((item) => {
      return item._id == cardElement.id
  })
    const myProfile = card.likes.find((item) => {
      return item._id == cardData.myId
  })
    return myProfile ? true : false
  })
  .catch((err) => {
      console.log(err)
  })
  .then((result) => {
  if (result) {
    cardData.addLike(buttonLike)
  }
  })

  buttonLike.addEventListener('click', () => {
    cardData.addLike(buttonLike)
    if (buttonLike.classList.contains('card__like-button_is-active')) {
      cardData.addLikeApiCard(cardElement.id)
          .then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then((result) => {
              document.getElementById(`${cardElement.id}`).querySelector('.card__like-count').textContent = result.likes.length
          })
          .catch((err) => {
              console.log(err)
          })
    } else {
      cardData.remuveLikeApiCard(cardElement.id)
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
          document.getElementById(`${cardElement.id}`).querySelector('.card__like-count').textContent = result.likes.length
      })
      .catch((err) => {
          console.log(err);
      })
    }
  })
  
  buttonDelete.addEventListener('click', () => {
    cardData.cardToDelete = cardElement
    cardData.addPopupDelete(cardElement)
  })

  return cardElement
}

export function deleteCard(element) {
  element.remove()
}

export function addLike (element) {
  element.classList.toggle('card__like-button_is-active')
};