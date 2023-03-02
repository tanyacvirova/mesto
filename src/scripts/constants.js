const zelenogradskImg = new URL('../images/elemen_zelenogradsk.jpg', import.meta.url);
const kazanImg = new URL('../images/element_kazan.jpg', import.meta.url);
const vladivostokImg = new URL('../images/element_vladivostok.jpg', import.meta.url);
const kareliaImg = new URL('../images/element_karelia.jpg', import.meta.url);
const spbImg = new URL('../images/element_saint-petersburg.jpg', import.meta.url);
const kamchatkaImg = new URL('../images/element_kamchatka.jpg', import.meta.url);


export const initialCards = [
  {
    name: 'Зеленоградск',
    link: zelenogradskImg
  },
  {
    name: 'Казань',
    link: kazanImg
  },
  {
    name: 'Владивосток',
    link: vladivostokImg
  },
  {
    name: 'Карелия',
    link: kareliaImg
  },
  {
    name: 'Санкт-Петербург',
    link: spbImg
  },
  {
    name: 'Камчатка',
    link: kamchatkaImg
  },
]

export const validationArgs = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__form-item_type_error',
}
