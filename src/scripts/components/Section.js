export class Section{
    constructor({ renderer }, containerSelector){
        this._renderCard = renderer;
        this._container = document.querySelector(containerSelector);;
    }

    renderItem(cardInfo){
        cardInfo.forEach(item => this._renderCard(item));    
    }

    addItem(card){
        this._container.prepend(card);
    }

}