import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup{
    constructor(popupSelector, submitter){
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._submitter = submitter;
        this._submitButton = this._popupForm.querySelector('.popup__submit-button');
    }

    setSubmitter(func){
        this._submitter = func;

    }

    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitter();
    })
    }
}