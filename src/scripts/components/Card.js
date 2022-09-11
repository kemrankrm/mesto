export class Card{
    constructor(cardData, templateSelector, ownerId, { 
        handleCardClick,
        handleCardLike,
        handleCardDislike,
        handleCardRemove}){
        this._title = cardData.name;
        this._image = cardData.link;
        this._owner = cardData.owner._id;
        this._ownerId = ownerId
        this._template = document.querySelector(templateSelector).content.querySelector('.elements__element');
        this._handleCardClick = handleCardClick;
        this._cardId = cardData._id;
        this._likes = cardData.likes;
        this._likeCard = handleCardLike;
        this._dislikeCard = handleCardDislike;
        this._removeCard = handleCardRemove;
    }

//Private Method
    _getTemplate(){
        const cardTemplate = this._template
        .cloneNode(true);
        return cardTemplate;
    }

//Private Methods
    //LIKE METHOD
    _handleCardLike(){
        this._likeCard(this._cardId)
            
    }

    //DISLIKE METHOD
    _handleCardDislike(){
        this._dislikeCard(this._cardId)
            
    }
    //IF CARD IS LIKED CHECKUP
    _isLiked(){
        return this._likes.some(item => {
            return Object.values(item).some(value => {
                return value === this._ownerId
            })
        })
    }

//Private Method
    _handleCardRemove(){
        this._removeCard();
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
        
        this._likeElement.addEventListener('click', () => {
            if(this._isLiked()){
                this._handleCardDislike();
            } else {
                this._handleCardLike();
            }
            
        });

        this._element.querySelector('.elements__remove-button').addEventListener('click', () => {
            this._handleCardRemove();
        })
        
    }

//Public Method
    generateCard(){
        this._element = this._getTemplate();

        //CHECKING THE OWNER OF A CARD
        if(this._owner !== this._ownerId){
            this._element.querySelector('.elements__remove-button').setAttribute('style', 'visibility:hidden;');
        }
        
        if(this._isLiked()){
            this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');
        }

        const image = this._findImageElement();
        image.setAttribute('src', this._image);
        image.setAttribute('alt', this._title);
        this._element.querySelector('.elements__name').textContent = this._title;
        this._element.querySelector('.elements__like-counter').textContent = this._likes.length;
        this._likeElement = this._element.querySelector('.elements__like-button');
        this._likeCounter = this._element.querySelector('.elements__like-counter');

        this._setEventListeners();

        return this._element;
    }
}