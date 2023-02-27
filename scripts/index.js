/* Import modules */
import { Card } from './Card.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validationArgs } from './constants.js';

/* Declare variables */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

/* Render first 6 base cards from template */
const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card({
      data: cardItem,
      handleCardClick: () => {
        const popupZoom = new PopupWithImage('.popup_type_image-view');
        popupZoom.setEventListeners();
        popupZoom.open(cardItem.name, cardItem.link);
      }
    }, '.template-item');
    const cardElement = card.generateCard();
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
  const newCard = new Card({
    data: data,
    handleCardClick: () => {
      const popupZoomNewCard = new PopupWithImage('.popup_type_image-view');
      popupZoomNewCard.setEventListeners();
      ppopupZoomNewCard.open(data.name, data.link);
    }
  }, '.template-item');
  const newCardElement = newCard.generateCard();
  cardList.setItem(newCardElement);
});
popupAddNewCard.setEventListeners();

editButton.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.fill({data: info.getUserInfo()});
})

addButton.addEventListener('click', () => {
  popupAddNewCard.open();
})