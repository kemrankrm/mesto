export class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEsc = (evt) => this._handleEscClose(evt);
    }

    _handleEscClose(evt){
        if(evt.key === 'Escape'){
            this.close();
        }
    }

    open(el, id){
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEsc);
        this._cardElement = el;
        this._cardId = id;
    }

    close(){
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEsc);
    }

    setEventListeners(){
        const closeButton = this._popup.querySelector('.popup__close-button');
        const overlay = this._popup.querySelector('.popup__overlay');
        closeButton.addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());
        
    }
}