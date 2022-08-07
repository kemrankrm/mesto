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

//Popup openning function
function openPopup(element){
    document.addEventListener('keydown', closePopupEsc)
    element.classList.add('popup_open');
}

//Closing by Esc key Function
function closePopupEsc(evt){
    if(evt.key === 'Escape'){
        const openedPopup = document.querySelector('.popup_open');
        closePopup(openedPopup);
    }
}

//Popup Closing Function
function closePopup(element){
    element.classList.remove('popup_open');
    document.removeEventListener('keydown', closePopupEsc);
}

// Exporting the data
export {imagePopup, bigImage, citeImage, openPlaceElement, openPopup, closePopupEsc, closePopup}