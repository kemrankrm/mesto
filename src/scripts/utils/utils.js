import { Api } from "../components/Api.js";


const imagePopup = document.querySelector('.popup_type_image');
const bigImage = imagePopup.querySelector('.popup__image');
const citeImage = imagePopup.querySelector('.popup__cite');

// Place Card Open Function
function openPlaceElement(title, link){
    bigImage.setAttribute('src', link);
    bigImage.setAttribute('alt', title);
    citeImage.textContent = title;
    openPopup(imagePopup);
}

//API INITIALIZING
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
    headers: {
        authorization: '79d0facd-6ee6-4095-a416-6e7e24695299',
        'Content-Type': 'application/json'
    }
    });

// Exporting the data
export {imagePopup, bigImage, citeImage, openPlaceElement, api}