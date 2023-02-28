import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__form-item');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    fill({data}) {
        this._popup.querySelector('.popup__form-item_el_name').value = data.name;
        this._popup.querySelector('.popup__form-item_el_job').value = data.job;
    }

    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup
            .querySelector('.popup__form')
            .addEventListener('submit', (evt) => this._submitForm(evt));
    }

    _submitForm(evt) {
        evt.preventDefault();
        const data = this._getInputValues();
        this._handleFormSubmit(data);
        this.close();
    }
}