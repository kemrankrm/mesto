//Importing Data
import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";
import { config,
        imagePopup,
        bigImage,
        citeImage,
        editButton,
        addButton,
        editFormPopup,
        addFormPopup,
        formElementClose,
        newPlaceCloseButton,
        profileName,
        profileJob,
        element,
        imagePopupCloseButton,
        editOverlay,
        addOverlay,
        imageOverlay,
        formEditProfile,
        formAddCard,
        nameInput,
        jobInput,
        placeName,
        placeImageUrl,
        buttonForFormEditProfileSubmit,
        buttonForFormAddCardSubmit} from "./utils/constants.js";
import { openPopup } from "./utils/utils.js";
import { closePopup } from "./utils/utils.js";
import Section from "./Section.js";

//Validation Initializing
const formSelectors = [formEditProfile.id, formAddCard.id];
const editFormValidator = new FormValidator(config, formSelectors[0]);
const addFormValidator = new FormValidator(config, formSelectors[1]);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Initial Cards Generation
cardRenderer(initialCards);

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
    const cardObject = [{name: placeName.value, link: placeImageUrl.value}];
    cardRenderer(cardObject);
    closePopup(addFormPopup);
    formAddCard.reset();
    addFormValidator.toggleButtonState(true, buttonForFormAddCardSubmit); //RESET SUBMIT BUTTON STATE
}

function cardRenderer(cardInfo){
    const newCard = new Section({ 
        data: cardInfo,
        renderer: (item) => {
            const card = new Card(item, '#element-template');
            
            const cardElement = card.generateCard();
            newCard._setCard(cardElement);
        }
    }, '.elements');
    
    newCard.renderItem();
}