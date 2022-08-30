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
        //Тут ищется кнопка лайка каждый раз, так как карточка хранится в this._element
        //Они все индивидуальны, так что на данном этапе я думаю это одно из достаточно рациональных способов.
    }

//Private Method
    _handleCardRemove(){
        this._element.remove();
        this._element = null;
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

        const image = this._findImageElement();
        image.setAttribute('src', this._image);
        image.setAttribute('alt', this._title);
        this._element.querySelector('.elements__name').textContent = this._title;

        this._setEventListeners();

        return this._element;
    }
}