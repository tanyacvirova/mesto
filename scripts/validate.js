const validationArgs = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__form-item_type_error',
}

// Handle error: show red line under input + show error message
const showInputError = (formElement, inputElement, inputErrorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Remove red line and error message
const hideInputError = (formElement, inputErrorClass, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

// Check validity: if input invalid — show red line and error message
// If valid — remove and clear all
const isValid = (formElement, inputElement, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputErrorClass, inputElement);
  }
};

// Check if there is at least one invalid input in whole form
const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Set status for submit button
// If at least one input invalid, makes button disabled
const toggleButtonState = (inputs, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

// Set event listeners for every input in form
// Will work every single time, when user will print sth in field
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass) => {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputs, buttonElement, inactiveButtonClass);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass);
      toggleButtonState(inputs, buttonElement, inactiveButtonClass);
    });
  });
};

// Validate every form with special selector
function enableValidation(validationArgs) {
  const forms = document.querySelectorAll(validationArgs.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, validationArgs.inputSelector, validationArgs.submitButtonSelector,
      validationArgs.inactiveButtonClass, validationArgs.inputErrorClass);
  })
}

enableValidation(validationArgs);
