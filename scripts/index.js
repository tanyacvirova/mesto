/* Render first 6 base cards from template */
/* Also: delete cards, add and remove likes, open zoom popup */
const initialCards = [
  {
      name: 'Зеленоградск',
      link: './images/elemen_zelenogradsk.jpg'
  },
  {
      name: 'Казань',
      link: './images/element_kazan.jpg'
  },
  {
      name: 'Владивосток',
      link: './images/element_vladivostok.jpg'
  },
  {
      name: 'Карелия',
      link: './images/element_karelia.jpg'
  },
  {
      name: 'Санкт-Петербург',
      link: './images/element_saint-petersburg.jpg'
  },
  {
      name: 'Камчатка',
      link: './images/element_kamchatka.jpg'
  },
]

const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.template-item').content.querySelector('.element');

function createCard (name, link) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.element__title');
  cardTitle.textContent = name;
  const cardImage = card.querySelector('.element__photo');
  cardImage.src = link;
  cardImage.alt += `${name}.`;
  const deleteButton = card.querySelector('.element__delete');
  const deleteCard = () => {
    card.remove();
  }
  deleteButton.addEventListener('click', deleteCard);
  const likeButton = card.querySelector('.element__like');
  const likeCard = () => {
    likeButton.classList.toggle('element__like_active');
  }
  likeButton.addEventListener('click', likeCard);
  const photo = card.querySelector('.element__photo');
  const photoZoom = () => {
    openPopup(popupZoom);
    const zoomPhoto = popupZoom.querySelector('.popup__image');
    zoomPhoto.src = link;
    zoomPhoto.alt += `${name}.`;
    const zoomCaption = popupZoom.querySelector('.popup__caption');
    zoomCaption.textContent = name;
  }
  photo.addEventListener('click', photoZoom);
  return card;
}

function renderCards () {
  initialCards.forEach(item => {
      const cardHtml = createCard(item.name, item.link);
      cardContainer.append(cardHtml);
  })
}

renderCards();

/* Open and close popups */
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeEditButton = popupEdit.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let editFormElement = popupEdit.querySelector('.popup__form');
let nameInput = popupEdit.querySelector('.popup__form-item_el_name');
let jobInput = popupEdit.querySelector('.popup__form-item_el_job');

const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const closeNewCardButton = popupNewCard.querySelector('.popup__close-button');

let addFormElement = popupNewCard.querySelector('.popup__form');
let titleInput = popupNewCard.querySelector('.popup__form-item_el_title');
let linkInput = popupNewCard.querySelector('.popup__form-item_el_link');

const popupZoom = document.querySelector('.popup_type_image-view');
const closeZoom = popupZoom.querySelector('.popup__close-button');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function fillPopupEdit() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    fillPopupEdit();
})

addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
})

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

closeEditButton.addEventListener('click', () => {
    closePopup(popupEdit);
})

closeNewCardButton.addEventListener('click', () => {
    closePopup(popupNewCard);
})

closeZoom.addEventListener('click', () => {
  closePopup(popupZoom);
})

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
    const newCard = createCard (title, url);
    cardContainer.prepend(newCard);
    titleInput.value = '';
    linkInput.value = '';
    closePopup(popupNewCard);
}

editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
