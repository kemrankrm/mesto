// import { Card } from "./Card.js";
// import { element } from "./utils/constants.js";
// import { initialCards } from "./cards.js";

export class Section{
    constructor({ data, renderer }, containerSelector){
        this._cardInfo = data;
        this._renderCard = renderer;
        this._containerSelector = document.querySelector(containerSelector);;
    }

    renderItem(){
        this._cardInfo.forEach(item => this._renderCard(item));    
    }

    addItem(card){
        this._containerSelector.prepend(card);
    }

}