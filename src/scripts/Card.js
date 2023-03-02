// import { popupZoom, zoomPhoto, zoomCaption } from './constants.js';

export class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  // _zoomOnPhoto() {
  //   this._openPopup(popupZoom);
  //   zoomPhoto.src = this._link;
  //   zoomCaption.textContent = this._name;
  //   zoomPhoto.alt = `Фото. ${this._name}.`;
  // }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._buttonLike = this._element.querySelector('.element__like');
    this._buttonLike.addEventListener('click', () => {
      this._likeCard();
    });
    this._cardImage = this._element.querySelector('.element__photo');
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фото. ${this._name}.`;
    return this._element;
  }
}
