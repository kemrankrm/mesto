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

// Exporting the data
export {imagePopup, bigImage, citeImage, openPlaceElement}