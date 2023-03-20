import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
    // constructor({ selector, handleAction }) {
    //     super(selector);
    //     this._handleAction = handleAction;
    // }

    setAction(handleAction) {
        this._handleAction = handleAction;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup
            .querySelector('.popup__save-button')
            .addEventListener('click', (evt) => {
                evt.preventDefault();
                this._handleAction();
                // this.close();
            });
    }
}