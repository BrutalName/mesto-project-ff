const formProfile = document.forms['edit-profile']
const formPlace = document.forms['new-place']
const popupImagePop = document.querySelector('.popup_type_image')
const popupImage = popupImagePop.querySelector('.popup__image')
const popupImageTextContent = popupImagePop.querySelector('.popup__caption')

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

export {formProfile, formPlace}