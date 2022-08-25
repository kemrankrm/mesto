export class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose(evt){
        if(evt.key === 'Escape'){
            this.close();
        }
    }

    open(){
        this._popup.classList.add('popup_open');
        this.setEventListeners();
    }

    close(){
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', () => this._handleEscClose(), true);
    }

    setEventListeners(){
        const closeButton = this._popup.querySelector('.popup__close-button');
        const overlay = this._popup.querySelector('.popup__overlay');
        closeButton.addEventListener('click', () => this.close());
        document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
        overlay.addEventListener('click', () => this.close());

    }
}