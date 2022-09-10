import { api } from "./utils/utils";
import { ownerId } from "./utils/constants";
import { removeCardPopup } from "./utils/utils";


export class Card{
    constructor(cardData, templateSelector, ownerId, { handleCardClick }){
        this._title = cardData.name;
        this._image = cardData.link;
        this._owner = cardData.owner._id;
        this._ownerId = ownerId
        this._template = document.querySelector(templateSelector).content.querySelector('.elements__element');
        this._handleCardClick = handleCardClick;
        this._cardId = cardData._id;
        this._likes = cardData.likes;
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
        api.putLike(this._cardId)
            .then(res => {
                this._element.querySelector('.elements__like-counter').textContent = res.likes.length;
                console.log('CARD LIKED', res)
                this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');
            });
        
        //Тут ищется кнопка лайка каждый раз, так как карточка хранится в this._element
        //Они все индивидуальны, так что на данном этапе я думаю это одно из достаточно рациональных способов.
    }

    //DISLIKE METHOD
    _handleCardDislike(){
        api.removeLike(this._cardId)
            .then(res => {
                this._element.querySelector('.elements__like-button').classList.remove('elements__like-button_active');
                console.log('LIKE REMOVED', res);
                this._element.querySelector('.elements__like-counter').textContent = res.likes.length;
            })
    }
    //IF CARD IS LIKED CHECKUP
    _handleUserLike(){
        return this._likes.some(item => {
            return Object.values(item).some(value => {
                return value === ownerId
            })
        })
    }

//Private Method
    _handleCardRemove(){
        removeCardPopup.open(this._element, this._cardId);
        // api.removeCard(this._cardId)
        //     .then(res => {
        //         this._element.remove();
        //         this._element = null;
                
        //     })
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
            if(this._likes.some(item => {
                return Object.values(item).some(value => {return value === ownerId})
            })){
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
        
        const isLiked = this._handleUserLike();
        if(isLiked){
            this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');
        }

        const image = this._findImageElement();
        image.setAttribute('src', this._image);
        image.setAttribute('alt', this._title);
        this._element.querySelector('.elements__name').textContent = this._title;
        this._element.querySelector('.elements__like-counter').textContent = this._likes.length;

        this._setEventListeners();

        return this._element;
    }
}