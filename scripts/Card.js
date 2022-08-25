export class Card{
    constructor(cardData, templateSelector, { handleCardClick }){
        this._title = cardData.name;
        this._image = cardData.link;
        this._template = templateSelector;
        this._handleCardClick = handleCardClick;
    }

//Private Method
    _getTemplate(){
        const cardTemplate = document
        .querySelector(this._template)
        .content
        .querySelector('.elements__element')
        .cloneNode(true);

        return cardTemplate;
    }

//Private Method
    _handleCardLike(){
        this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    }

//Private Method
    _handleCardRemove(){
        this._element.remove();
    }

//Private Method
    _findImageElement(){
        const imageElement = this._element.querySelector('.elements__image');
        return imageElement;
    }

//Private Method
    _setEventListeners(evt){
        this._findImageElement().addEventListener('click', () => {
            this._handleCardClick()
        });
        
        this._element.querySelector('.elements__like-button').addEventListener('click', () => {
            this._handleCardLike();
        })

        this._element.querySelector('.elements__remove-button').addEventListener('click', () => {
            this._handleCardRemove();
        })
        
    }

//Public Method
    generateCard(){
        this._element = this._getTemplate();

        this._findImageElement().setAttribute('src', this._image);
        this._findImageElement().setAttribute('alt', this._title);
        this._element.querySelector('.elements__name').textContent = this._title;

        this._setEventListeners();

        return this._element;
    }
}