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
const toggleInputErrorState = (formElement, inputElement, inputErrorClass) => {
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

// Disable button
function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', '');
}

// Enable button
function enableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

// Set status for submit button
// If at least one input invalid, makes button disabled
const toggleButtonState = (inputs, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
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
      toggleInputErrorState(formElement, inputElement, inputErrorClass);
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
