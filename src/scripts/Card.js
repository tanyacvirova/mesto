export class Card {
  constructor({ data, currentUserId, handleCardClick, handleDeleteIconClick, handleLikeClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._currentUserId = currentUserId;
    this._isOwner = data.owner._id === currentUserId;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  updateLikes(data) {
    this._buttonLike.classList.toggle('element__like_active');
    this._likeCounter.textContent = data.likes.length;
    this._isLiked = data.likes.some((like) => {
      return Object.values(like).includes(this._currentUserId);
    });
  }

  _setEventListeners() {
    this._buttonDelete = this._element.querySelector('.element__delete');
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteIconClick(this._element, this._cardId);
    });
    this._buttonLike = this._element.querySelector('.element__like');
    this._likeCounter = this._element.querySelector('.element__like-count');
    this._isLiked = this._likes.some((like) => {
      return Object.values(like).includes(this._currentUserId);
    });
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._isLiked);
    });
    this._cardImage = this._element.querySelector('.element__photo');
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фото. ${this._name}.`;
    this._likeCounter.textContent = this._likes.length;
    if (this._isLiked) {
      this._buttonLike.classList.add('element__like_active');
    }
    if (!this._isOwner) {
      this._buttonDelete.classList.add('element__delete_hide');
    }
    return this._element;
  }
}
