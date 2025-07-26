const cardTempl = document.querySelector("#card-template").content;

export function createCard(cardData) {
    const cardElement = cardTempl.querySelector(".card").cloneNode(true);
    const cardElementImage = cardElement.querySelector(".card__image");
    const cardElementTitle = cardElement.querySelector(".card__title");
    const buttonLike = cardElement.querySelector(".card__like-button");
    const likeCount = cardElement.querySelector(".card__like-count");
    const buttonDelete = cardElement.querySelector(".card__delete-button");

    cardElement.id = cardData.cardId;
    cardElementImage.src = cardData.cardImg;
    cardElementImage.alt = cardData.cardTitle;
    cardElementTitle.textContent = cardData.cardTitle;
    likeCount.textContent = cardData.likeCount;

    cardElementImage.addEventListener("click", () => {
        cardData.addPopupImage(cardElementImage, cardElementTitle);
    });

    if (cardData.listILike[cardElement.id]) {
        addLike(buttonLike);
    }

    buttonLike.addEventListener("click", () => {
        if (!buttonLike.classList.contains("card__like-button_is-active")) {
            cardData
                .addLikeApiCard(cardElement.id)
                .then((result) => {
                    document.getElementById(`${cardElement.id}`).querySelector(".card__like-count").textContent = result.likes.length;
                })
                .then(() => {
                    cardData.addLike(buttonLike);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            cardData
                .removeLikeApiCard(cardElement.id)
                .then((result) => {
                    document.getElementById(`${cardElement.id}`).querySelector(".card__like-count").textContent = result.likes.length;
                })
                .then(() => {
                    cardData.addLike(buttonLike);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    buttonDelete.addEventListener("click", () => {
        cardData.cardToDelete = cardElement;
        cardData.addPopupDelete(cardElement);
    })

    if (!(cardData.myId == cardData.profileId)) {
        cardElement.querySelector(".card__delete-button").remove();
    }

    return cardElement;
}

export function deleteCard(element) {
    element.remove();
}

export function addLike(element) {
    element.classList.toggle("card__like-button_is-active");
}

export function findMyLike(cardsData, cardData) {
    cardsData.forEach((card) => {
        card.likes.forEach((likes) => {
            if (cardData.myId == likes._id) {
                const _id = card._id;
                cardData.listILike[_id] = card;
            }
        });
    });
}
