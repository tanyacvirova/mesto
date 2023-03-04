import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__caption');
    }

    open(caption, url) {
        this._popupImage.src = url;
        this._popupImage.alt = `Фото. ${caption}.`;
        this._popupCaption.textContent = caption;
        super.open();
    }
}