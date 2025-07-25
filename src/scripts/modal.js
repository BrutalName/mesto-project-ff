export function openPopup(element) {
  document.addEventListener("keydown", closeEscPopup);
  element.classList.add("popup_is-opened");
  element.classList.remove("popup_is-animated");
}

export function closePopup(element) {
  element.classList.add("popup_is-animated");
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscPopup);
}

function closeEscPopup(evt) {
  if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened");
      closePopup(popup);
  }
}
