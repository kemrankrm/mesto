import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, { submitter }){
        super(popupSelector);
        this._submitter = submitter;
        this._inputArray = Array.from(this._popup.querySelectorAll('input'));
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValue(){
        const formData = {};
        this._inputArray.forEach((item) => {
            if(item.name !== 'button'){
                formData[item.name] = item.value;
            }
        });

        return formData;
    }

    close(){
        super.close();
        this._popupForm.reset();
    }

    setEventListeners(){
        super.setEventListeners();
        const form = this._popup.querySelector('.popup__form');
        
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log(evt)
            this._submitter(this._getInputValue());
        })
    }
}