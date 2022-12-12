const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__form-item_name');
let jobInput = document.querySelector('.popup__form-item_job');

editButton.addEventListener('click', () => {
    popupEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

closeButton.addEventListener('click', () => {
    popupEdit.classList.remove('popup_opened');
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupEdit.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);
