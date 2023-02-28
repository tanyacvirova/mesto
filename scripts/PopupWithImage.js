import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(caption, url) {
        this._popup.querySelector('.popup__image').src = url;
        this._popup.querySelector('.popup__image').alt = `Фото. ${caption}.`;
        this._popup.querySelector('.popup__caption').textContent = caption;
        super.open();
    }
}