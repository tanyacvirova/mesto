/* Declare variables */
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.template-item').content.querySelector('.element');
const popupZoom = document.querySelector('.popup_type_image-view');

const zoomPhoto = popupZoom.querySelector('.popup__image');
const zoomCaption = popupZoom.querySelector('.popup__caption');

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

function createCard(name, link) {
  /* Clone element from template */
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.element__title');
  cardTitle.textContent = name;
  const cardImage = card.querySelector('.element__photo');
  cardImage.src = link;
  cardImage.alt += `${name}.`;
  /* Handle card deletion */
  const deleteButton = card.querySelector('.element__delete');
  const deleteCard = () => {
    card.remove();
  }
  deleteButton.addEventListener('click', deleteCard);
  const likeButton = card.querySelector('.element__like');
  /* Handle adding and removing likes */
  const likeCard = () => {
    likeButton.classList.toggle('element__like_active');
  }
  likeButton.addEventListener('click', likeCard);
  /* Open zoom on click */
  const photo = card.querySelector('.element__photo');
  const openZoomOnPhoto = () => {
    openPopup(popupZoom);
    zoomPhoto.src = link;
    zoomPhoto.alt += `${name}.`;
    zoomCaption.textContent = name;
  }
  photo.addEventListener('click', openZoomOnPhoto);
  return card;
}

function renderCards() {
  initialCards.forEach(item => {
    const cardHtml = createCard(item.name, item.link);
    cardContainer.append(cardHtml);
  })
}

/* Render first 6 base cards from template */
renderCards();

/* Open and close popups */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function fillPopupEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeByEsc(evt) {
  if (evt.key == 'Escape') {
    closePopup(evt.currentTarget);
  }
}

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  popupEdit.addEventListener('keyup', closeByEsc);
  fillPopupEdit();
})

addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
  popupNewCard.addEventListener('keyup', closeByEsc);
})

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/* For each close button on the page, find the nearest popup and close it */
closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
  popup.removeEventListener('keyup', closeByEsc);
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
  const newCard = createCard(title, url);
  cardContainer.prepend(newCard);
  evt.target.reset()
  closePopup(popupNewCard);
}

editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);

function closeByExternalClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

popupEdit.addEventListener('click', closeByExternalClick);
popupNewCard.addEventListener('click', closeByExternalClick);
popupZoom.addEventListener('click', closeByExternalClick);
