import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, { submitter }){
        super(popupSelector);
        this._submitter = submitter;
    }

    _getInputValue(){
        const inputArray = Array.from(this._popup.querySelectorAll('input'));
        const formData = {};

        inputArray.forEach((item) => {
            if(item.name !== 'button'){
                formData[item.name] = item.value;
            }
        });

        return formData;
    }

    close(){
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', () => this._handleEscClose(), true);
    }

    setEventListeners(){

        const closeButton = this._popup.querySelector('.popup__close-button');
        const overlay = this._popup.querySelector('.popup__overlay');
        const form = this._popup.querySelector('.popup__form');

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitter(this._getInputValue());
        })

        closeButton.addEventListener('click', () => this.close());
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        overlay.addEventListener('click', () => this.close());
    }
}