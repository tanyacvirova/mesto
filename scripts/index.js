const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__form-item_el_name');
let jobInput = document.querySelector('.popup__form-item_el_job');

function openPopup() {
    popupEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    popupEdit.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
