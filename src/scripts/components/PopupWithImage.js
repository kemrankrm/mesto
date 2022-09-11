import { Popup } from "./Popup.js";

class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._cite = this._popup.querySelector('.popup__cite');
    }

    open(title, image){
        this._image.setAttribute('src', image);
        this._image.setAttribute('alt', title);
        this._cite.textContent = title;

        super.open();
    }
}

export {PopupWithImage};