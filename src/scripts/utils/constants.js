//CONFIG DATA SETUP
export const config = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__button_disabled', // NO NEED SINCE 'DISABLED' ATTRIBUTE USED
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error',
    activeErrorClass: 'popup__input_type_error-active'
};

// Variable Setup
export const imagePopup = document.querySelector('.popup_type_image');
export const bigImage = imagePopup.querySelector('.popup__image');
export const citeImage = imagePopup.querySelector('.popup__cite');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const editFormPopup = document.querySelector('.popup_type_profile-edit');
export const addFormPopup = document.querySelector('#popup-np');
export const formElementClose = document.querySelector('#pup-close');
export const newPlaceCloseButton = document.querySelector('#np-close');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');
export const element = document.querySelector('.elements');
export const imagePopupCloseButton = document.querySelector('#pi-close');
export const editOverlay = editFormPopup.querySelector('.popup__overlay');
export const addOverlay = addFormPopup.querySelector('.popup__overlay');
export const imageOverlay = imagePopup.querySelector('.popup__overlay');
export const editAvatarButton = document.querySelector('.profile__avatar-container');
export const avatarImage = document.querySelector('.profile__avatar');
export const removePopup = document.querySelector('.popup_type_remove');
export const ownerId = '8846fdb74ad1f15025977e81';
export const newPlaceSubmitButton = document.querySelector('#np-submit');


//Forms Variables SetUp
export const formEditProfile = document.forms.editForm;
export const formAddCard = document.forms.addForm;
export const formEditAvatar = document.forms.avatarForm;
export const popupRemoveForm = document.forms.removeCard;
export const nameInput = formEditProfile.elements.name;
export const jobInput = formEditProfile.elements.job;
export const placeName = formAddCard.elements.placeName;
export const placeImageUrl = formAddCard.elements.url;
export const buttonForFormEditProfileSubmit = formEditProfile.elements.button;
export const buttonForFormAddCardSubmit = formAddCard.elements.button;
export const buttonForCardRemoval = popupRemoveForm.elements.button;
export const buttonForAvatarEdition = formEditAvatar.elements.button;