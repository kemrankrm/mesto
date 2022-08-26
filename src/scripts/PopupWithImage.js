import { Popup } from "./Popup.js";

class PopupWithImage extends Popup{
    constructor(popupSelector, title, image){
        super(popupSelector);
        this._data = {title, image};
    }

    

    open(){
        const openProcess = super.open();
        this._popup.querySelector('.popup__image')
        .setAttribute('src', this._data.image);

        this._popup.querySelector('.popup__image')
        .setAttribute('alt', this._data.title);

        this._popup.querySelector('.popup__cite')
        .textContent = this._data.title;

        this._popup.classList.add('popup_open');

        this.setEventListeners();
    }
}

export {PopupWithImage};