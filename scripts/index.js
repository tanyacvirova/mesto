/* Import modules */
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validationArgs, popupZoom } from './constants.js';

/* Declare variables */
const cardContainer = document.querySelector('.elements');
const cardTemplateSelector = '.template-item';

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const editFormElement = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__form-item_el_name');
const jobInput = popupEdit.querySelector('.popup__form-item_el_job');

const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

const addFormElement = popupNewCard.querySelector('.popup__form');
const titleInput = popupNewCard.querySelector('.popup__form-item_el_title');
const linkInput = popupNewCard.querySelector('.popup__form-item_el_link');

function renderCards() {
  initialCards.forEach(item => {
    const card = new Card(item.name, item.link, cardTemplateSelector, openPopup);
    const cardElement = card.generateCard();
    cardContainer.append(cardElement);
  })
}

/* Render first 6 base cards from template */
renderCards();

/* Turn on validation */
const popupEditValidation = new FormValidator(validationArgs, document.forms[0]);
popupEditValidation.enableValidation();
const popupAddNewCard = new FormValidator(validationArgs, document.forms[1]);
popupAddNewCard.enableValidation();

/* Open and close popups */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEsc);
}

function fillPopupEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  fillPopupEdit();
})

addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
})

/* For each close button on the page, find the nearest popup and close it */
closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

/* Saving the entered values before closing popups */
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const url = linkInput.value;
  const newCard = new Card(title, url, cardTemplateSelector, openPopup);
  const newCardElement = newCard.generateCard();
  cardContainer.prepend(newCardElement);
  evt.target.reset();
  closePopup(popupNewCard);
}

editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);

/* Close popup by click anywhere outside popup */
function closeByExternalClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

popupEdit.addEventListener('click', closeByExternalClick);
popupNewCard.addEventListener('click', closeByExternalClick);
popupZoom.addEventListener('click', closeByExternalClick);
