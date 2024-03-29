import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__form-item');
        this._popupForm = this._popup.querySelector('.popup__form');
        this._saveButton = this._popup.querySelector('.popup__save-button');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    fill({ data }) {
        this._inputList.forEach(input => {
            if (data[input.name]) {
                input.value = data[input.name];
            }
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setButtonStatusLoading(isLoading) {
        if (isLoading) {
            this._defaultButtonText = this._saveButton.textContent;
            this._saveButton.textContent = 'Сохранение...';
        } else {
            this._saveButton.textContent = this._defaultButtonText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => this._submitForm(evt));
    }

    _submitForm(evt) {
        evt.preventDefault();
        const data = this._getInputValues();
        this._handleFormSubmit(data);
        // this.close();
    }
}