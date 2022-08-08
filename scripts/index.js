//Importing Data
import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";
import { imagePopup } from "./utils/utils.js";
import { openPopup } from "./utils/utils.js";
import { closePopup } from "./utils/utils.js";

//CONFIG DATA SETUP
const config = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__button_disabled', // NO NEED SINCE 'DISABLED' ATTRIBUTE USED
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error',
    activeErrorClass: 'popup__input_type_error-active'
};

// Variable Setup
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editFormPopup = document.querySelector('.popup_type_profile-edit');
const addFormPopup = document.querySelector('#popup-np');
const formElementClose = document.querySelector('#pup-close');
const newPlaceCloseButton = document.querySelector('#np-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const element = document.querySelector('.elements');
const imagePopupCloseButton = document.querySelector('#pi-close');
const editOverlay = editFormPopup.querySelector('.popup__overlay');
const addOverlay = addFormPopup.querySelector('.popup__overlay');
const imageOverlay = imagePopup.querySelector('.popup__overlay');

//Forms Variables SetUp
const formEditProfile = document.forms.editForm;
const formAddCard = document.forms.addForm;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.job;
const placeName = formAddCard.elements.placeName;
const placeImageUrl = formAddCard.elements.url;
const buttonForFormEditProfileSubmit = formEditProfile.elements.button;
const buttonForFormAddCardSubmit = formAddCard.elements.button;

//Validation Initializing
const formSelectors = [formEditProfile.id, formAddCard.id];
const editFormValidator = new FormValidator(config, formSelectors[0]);
const addFormValidator = new FormValidator(config, formSelectors[1]);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Initial Cards Generation
initialCards.forEach(item => {
    renderCard(createCard(item).generateCard());
});

// Event Listeners
editButton.addEventListener('click', openEditProfileForm);
addButton.addEventListener('click', () => openPopup(addFormPopup));
formElementClose.addEventListener('click', () => closePopup(editFormPopup));
formEditProfile.addEventListener('submit', submitEditProfileForm);
newPlaceCloseButton.addEventListener('click', () => closePopup(addFormPopup));
formAddCard.addEventListener('submit', submitNewPlace);
imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));
editOverlay.addEventListener('click', () => closePopup(editFormPopup));
addOverlay.addEventListener('click', () => closePopup(addFormPopup));
imageOverlay.addEventListener('click', () => closePopup(imagePopup));

// Functions:
// Edit Form Open Function
function openEditProfileForm(){
    const editInputs = [nameInput, jobInput];
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    editFormValidator.clearValidationErrors();
    openPopup(editFormPopup);
}

// Edit Form Submit Function
function submitEditProfileForm(evt){
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editFormPopup);
    evt.preventDefault();

}

// Place Card Submit Funciton
function submitNewPlace(evt){
    evt.preventDefault();
    const cardObject = {name: placeName.value, link: placeImageUrl.value};
    renderCard(createCard(cardObject).generateCard());
    closePopup(addFormPopup);
    formAddCard.reset();
    addFormValidator.toggleButtonState(true, buttonForFormAddCardSubmit); //RESET SUBMIT BUTTON STATE
}

// New Card Placing Function
function renderCard(cardData){
    element.prepend(cardData);
}

//New Card Creation Function
function createCard(cardData){
    const cardElement = new Card(cardData, '#element-template');
    return cardElement;
}