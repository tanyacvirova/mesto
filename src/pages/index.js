/* Import modules */
import { Card } from '../scripts/Card.js';
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { initialCards, validationArgs } from '../scripts/constants.js';

import '../pages/index.css';

/* Declare variables */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupZoom = new PopupWithImage('.popup_type_image-view');
popupZoom.setEventListeners();

function generateCard(objectElement, popupElement) {
  const card = new Card({
    data: objectElement,
    handleCardClick: (cardItemName, cardItemLink) => {
      popupElement.open(cardItemName, cardItemLink);
    }
  }, '.template-item');
  const cardElement = card.generateCard();
  return cardElement;
}

/* Render first 6 base cards from template */
const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const cardElement = generateCard(cardItem, popupZoom);
    cardList.setItem(cardElement);
  }
}, '.elements');

cardList.renderItems();

/* Turn on validation */
const popupEditValidation = new FormValidator(validationArgs, document.forms[0]);
popupEditValidation.enableValidation();
const popupAddNewCardValidation = new FormValidator(validationArgs, document.forms[1]);
popupAddNewCardValidation.enableValidation();

const info = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

/* Handle opening and closing popups */
const popupEdit = new PopupWithForm('.popup_type_edit', (data) => {
  info.setUserInfo({ data });
});
popupEdit.setEventListeners();

const popupAddNewCard = new PopupWithForm('.popup_type_new-card', (data) => {
  const newCardElement = generateCard(data, popupZoom);
  cardList.setItem(newCardElement);
});
popupAddNewCard.setEventListeners();

editButton.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.fill({ data: info.getUserInfo() });
})

addButton.addEventListener('click', () => {
  popupAddNewCard.open();
})