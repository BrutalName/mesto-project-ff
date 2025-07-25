function showInputError (formElement, inputElement, errorMessage, classErrorVisible, classImputError) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(classImputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classErrorVisible);
};

function hideInputError (formElement, inputElement, classErrorVisible, classImputError) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(classImputError);
  errorElement.classList.remove(classErrorVisible);
  errorElement.textContent = '';
};

function checkValidityPatern (inputElement) {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
      inputElement.setCustomValidity("")
  };
}

function checkInputValidity (formElement, inputElement, errorClass, inputErrorClass, checkValidityPatern, showInputError, hideInputError) {
  checkValidityPatern (inputElement)
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
}

function toggleButtonState (inputList, buttonElement, classInactiveButton, hasInvalidInput) {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(classInactiveButton)
  } else {
      buttonElement.classList.remove(classInactiveButton)
  }
}

function setEventListeners (formElement, inputSelector, submitButtonSelector, toggleButtonState, checkInputValidity, hasInvalidInput, checkValidityPatern, showInputError, hideInputError, classСontainer) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector)
  toggleButtonState(inputList, buttonElement, classСontainer.inactiveButtonClass, hasInvalidInput)
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, classСontainer.errorClass, classСontainer.inputErrorClass, checkValidityPatern, showInputError, hideInputError);
      toggleButtonState(inputList, buttonElement, classСontainer.inactiveButtonClass, hasInvalidInput)
      });
  });
};

export function enableValidation (classСontainer) {
  const formList = Array.from(document.querySelectorAll(classСontainer.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
          evt.preventDefault();
      });
      setEventListeners(formElement, classСontainer.inputSelector, classСontainer.submitButtonSelector, toggleButtonState, checkInputValidity, hasInvalidInput, checkValidityPatern, showInputError, hideInputError, classСontainer);
  });
};

export function clearValidation (profileForm, classСontainer) {
  const inputList = Array.from(profileForm.querySelectorAll(classСontainer.inputSelector))
  const buttonElement = profileForm.querySelector(classСontainer.submitButtonSelector)
  inputList.forEach((inputElement) => {
    checkInputValidity(profileForm, inputElement, classСontainer.errorClass, classСontainer.inputErrorClass, checkValidityPatern, showInputError, hideInputError)
    toggleButtonState(inputList, buttonElement, classСontainer.inactiveButtonClass, hasInvalidInput)
  })
}