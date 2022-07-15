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

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButon = document.querySelector('#pi-close');
const bigImage = imagePopup.querySelector('.popup__image');
const citeImage = imagePopup.querySelector('.popup__cite');
const elementTemplate = document.querySelector('#element-template').content;
const editOverlay = editFormPopup.querySelector('.popup__overlay');
const addOverlay = addFormPopup.querySelector('.popup__overlay');
const imageOverlay = imagePopup.querySelector('.popup__overlay');

const placeElementTemplate = elementTemplate.querySelector('.elements__element');

//Forms Variables SetUp
const editFormElement = document.forms.editForm;
const addFormElement = document.forms.addForm;
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.job;
const placeName = addFormElement.elements.placeName;
const placeImageUrl = addFormElement.elements.url;
const editSubmitButton = editFormElement.elements.button;
const addSubmitButton = addFormElement.elements.button;

// Initial Cards Generation
initialCards.forEach(item => renderCard(item));

// Event Listeners
editButton.addEventListener('click', openForm);
addButton.addEventListener('click', () => openPopup(addFormPopup));
formElementClose.addEventListener('click', () => closePopup(editFormPopup));
editFormElement.addEventListener('submit', submitFormHandler);
newPlaceCloseButton.addEventListener('click', () => closePopup(addFormPopup));
addFormElement.addEventListener('submit', submitNewPlace);
imagePopupCloseButon.addEventListener('click', () => closePopup(imagePopup));
editOverlay.addEventListener('click', () => closePopup(editFormPopup));
addOverlay.addEventListener('click', () => closePopup(addFormPopup));
imageOverlay.addEventListener('click', () => closePopup(imagePopup));

// Escape keydown closing
document.addEventListener('keydown', closePopupEsc)

function closePopupEsc(evt){
    const openedPopup = document.querySelector('.popup_open');
    if(evt.key === 'Escape'){
        closePopup(openedPopup);
    }
}

// Functions:
// Edit Form Open Function
function openForm(){
    const editInputs = [nameInput, jobInput];
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(editFormPopup);
    checkValidity(nameInput, editFormElement, config); //CHECKING THE VALIDITY ONES FORM IS OPEN
    checkValidity(jobInput, editFormElement, config);  //CHECKING THE VALIDITY ONES FORM IS OPEN
    toggleButtonState(hasInvalidInputs(editInputs), editSubmitButton);
}

// Edit Form Submit Function
function submitFormHandler(evt){
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editFormPopup);
    evt.preventDefault();

}

// Place Card Submit Funciton
function submitNewPlace(evt){
    evt.preventDefault();
    const cardObject = {name: placeName.value, link: placeImageUrl.value};
    renderCard(cardObject);
    closePopup(addFormPopup);
    addFormElement.reset();
    toggleButtonState(true, addSubmitButton); //RESET SUBMIT BUTTON STATE
}

// Place Card Remove Function
function removePlaceElement(evt){
        evt.target.closest('.elements__element').remove();
}

// Place Card Like Function
function likePlaceElement(evt){
        evt.target.classList.toggle('elements__like-button_active');
}

// Place Card Open Function
function openPlaceElement(evt){
        bigImage.setAttribute('src', evt.target.getAttribute('src'));
        bigImage.setAttribute('alt', evt.target.getAttribute('alt'));
        citeImage.textContent = evt.target.getAttribute('alt');
        openPopup(imagePopup);
}

// Popup Open Function
function openPopup(element){
    element.classList.add('popup_open');
}

// Popup Close Function
function closePopup(element){
    element.classList.remove('popup_open');
}

// Card Creation Function
function createCard(card) {
        const placeElement = placeElementTemplate.cloneNode(true);
        
        placeElement.querySelector('.elements__name').textContent = card.name;
        placeElement.querySelector('.elements__image').setAttribute('src', card.link);
        placeElement.querySelector('.elements__image').setAttribute('alt', card.name);

        // Event Listeners Addition
        placeElement.querySelector('.elements__remove-button').addEventListener('click', removePlaceElement);
        placeElement.querySelector('.elements__like-button').addEventListener('click', likePlaceElement);
        placeElement.querySelector('.elements__image').addEventListener('click', openPlaceElement);

        return placeElement;
}

// New Card Placing Function
function renderCard(cardData){
    element.prepend(createCard(cardData));
}