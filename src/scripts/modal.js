const formProfile = document.forms['edit-profile']
const formPlace = document.forms['new-place']
const popupImagePop = document.querySelector('.popup_type_image')
const popupImage = popupImagePop.querySelector('.popup__image')
const popupImageTextContent = popupImagePop.querySelector('.popup__caption')
const popupALL = document.querySelectorAll('.popup')
const popupEdit = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const nameInputProfile = formProfile['name']
const descriptionInputProfile = formProfile['description']
const nameInputPlace = formPlace['place-name']
const linkInputPlace = formPlace['link']

export function openPop (element) {
  element.classList.add('popup_is-opened')
  element.classList.remove('popup_is-animated')
};

export function closePop (element) {
  formProfile.reset()
  formPlace.reset()
  element.classList.add('popup_is-animated')
  element.classList.remove('popup_is-opened')
};

export function addPopupImage (srcImg, textImg) {
  popupImageTextContent.textContent = textImg.textContent
  popupImage.src = srcImg.src
  popupImage.alt = textImg.alt
  openPop(popupImagePop) 
};

export {formProfile, formPlace, popupALL, popupEdit, popupNewCard, nameInputProfile, descriptionInputProfile, nameInputPlace, linkInputPlace}