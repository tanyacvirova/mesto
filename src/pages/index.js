/* Import modules */
import { Card } from '../scripts/Card.js';
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithSubmit } from '../scripts/PopupWithSubmit.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Api } from '../scripts/Api.js';

import '../pages/index.css';

/* Declare variables */

const validationArgs = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__form-item_type_error',
}

let currentuserId;

const info = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
});

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatar = document.querySelector('.profile__edit-avatar-button');

const popupZoom = new PopupWithImage('.popup_type_image-view');
popupZoom.setEventListeners();

const popupConfirmDeletion = new PopupWithSubmit('.popup_type_confirm');
popupConfirmDeletion.setEventListeners();

function generateCard(objectElement, popupElement) {
  const card = new Card({
    data: objectElement,
    currentUserId: currentuserId,
    handleCardClick: (cardItemName, cardItemLink) => {
      popupElement.open(cardItemName, cardItemLink);
    },
    handleDeleteIconClick: (cardElement, cardId) => {
      const handleDeleteCard = () => {
        api.deleteCard(cardId)
          .then(() => {
            cardElement.remove();
            cardElement = null;
            popupConfirmDeletion.close();
          })
          .catch((err) => {
            console.log(err);
          })
      }
      popupConfirmDeletion.setAction(handleDeleteCard);
      popupConfirmDeletion.open();
    },
    handleLikeClick: (cardId, isLiked) => {
      if (isLiked) {
        api.deleteLike(cardId)
          .then((newData) => {
            card.updateLikes(newData);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.setLike(cardId)
          .then((newData) => {
            card.updateLikes(newData);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }, '.template-item');
  const cardElement = card.generateCard();
  return cardElement;
}

/* Render base cards and profile info from server */
const cardList = new Section({
  renderer: (cardItem) => {
    const cardElement = generateCard(cardItem, popupZoom);
    cardList.setItem(cardElement);
  }
}, '.elements');

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61', 'b0e1bcc1-0d9d-46ff-bf36-be0a9e1dd630');

Promise.all([
  api.getCards(),
  api.getCurrentUser()
])
  .then(([items, user]) => {
    currentuserId = user._id;
    info.setUserInfo({ data: user });
    cardList.renderItems(items);
  })
  .catch((err) => {
    console.log(err);
  })

/* Turn on validation */
const popupEditValidation = new FormValidator(validationArgs, document.forms[0]);
popupEditValidation.enableValidation();
const popupAddNewCardValidation = new FormValidator(validationArgs, document.forms[1]);
popupAddNewCardValidation.enableValidation();
const popupEditAvatarValidation = new FormValidator(validationArgs, document.forms[2]);
popupEditAvatarValidation.enableValidation();

/* Handle opening and closing popups */

function editInfo(infoData) {
  popupEdit.setButtonStatusLoading(true);
  api.editPersonalInfo(infoData)
    .then((newInfo) => {
      info.setUserInfo({ data: newInfo });
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEdit.setButtonStatusLoading(false);
    })
}

const popupEdit = new PopupWithForm('.popup_type_edit', editInfo);
popupEdit.setEventListeners();

function addNewCard(item) {
  popupAddNewCard.setButtonStatusLoading(true);
  api
    .createNewCard(item)
    .then((newItem) => {
      const newCardElement = generateCard(newItem, popupZoom);
      cardList.setItem(newCardElement);
      popupAddNewCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddNewCard.setButtonStatusLoading(false);
    })
};

const popupAddNewCard = new PopupWithForm('.popup_type_new-card', addNewCard);
popupAddNewCard.setEventListeners();

editButton.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.fill({ data: info.getUserInfo() });
})

addButton.addEventListener('click', () => {
  popupAddNewCard.open();
})

function changeAvatar(avatarData) {
  popupEditAvatar.setButtonStatusLoading(true);
  api.editAvatar(avatarData)
    .then((newAvatar) => {
      info.setUserInfo({ data: newAvatar });
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.setButtonStatusLoading(false);
    })
}

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', changeAvatar);
popupEditAvatar.setEventListeners();

editAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
})