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

//Forms Variables SetUp
const editFormElement = document.forms.editForm;
const addFormElemnt = document.forms.addForm;
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.job;
const placeName = addFormElemnt.elements.placeName;
const placeImageUrl = addFormElemnt.elements.url;
const editSubmitButton = editFormElement.elements.button;
console.log(editSubmitButton)

// Initial Cards Generation
initialCards.forEach(item => renderCard(item));

// Event Listeners
editButton.addEventListener('click', formOpen);
addButton.addEventListener('click', () => openPopup(addFormPopup));
formElementClose.addEventListener('click', () => closePopup(editFormPopup));
editFormElement.addEventListener('submit', formSubmitHandler)
newPlaceCloseButton.addEventListener('click', () => closePopup(addFormPopup));
addFormElemnt.addEventListener('submit', newPlaceSubmit);
imagePopupCloseButon.addEventListener('click', () => closePopup(imagePopup));
editOverlay.addEventListener('click', () => closePopup(editFormPopup));
addOverlay.addEventListener('click', () => closePopup(addFormPopup));
imageOverlay.addEventListener('click', () => closePopup(imagePopup));

// Escape keydown closing
document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
        closePopup(editFormPopup);
        closePopup(addFormPopup);
        closePopup(imagePopup);
    }
});

// Functions:
// Edit Form Open Function
function formOpen(){
    const inputs = [nameInput, jobInput];
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(editFormPopup);
    checkValidity(nameInput, editFormElement, config); //CHECKING THE VALIDITY ONES FORM IS OPEN
    checkValidity(jobInput, editFormElement, config);  //CHECKING THE VALIDITY ONES FORM IS OPEN
    toggleButtonState(hasInvalidInputs(inputs), editSubmitButton);
}

// Edit Form Submit Function
function formSubmitHandler(evt){
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editFormPopup);
    evt.preventDefault();
}

// Place Card Submit Funciton
function newPlaceSubmit(evt){
    evt.preventDefault();
    const cardObject = {name: placeName.value, link: placeImageUrl.value};
    renderCard(cardObject);
    closePopup(addFormPopup);
    addFormElemnt.reset();
}

// Place Card Remove Function
function placeElementRemove(evt){
        evt.target.closest('.elements__element').remove();
}

// Place Card Like Function
function placeElementLike(evt){
        evt.target.classList.toggle('elements__like-button_active');
}

// Place Card Open Function
function placeElementOpen(evt){
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
        const placeElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
        
        placeElement.querySelector('.elements__name').textContent = card.name;
        placeElement.querySelector('.elements__image').setAttribute('src', card.link);
        placeElement.querySelector('.elements__image').setAttribute('alt', card.name);

        // Event Listeners Addition
        placeElement.querySelector('.elements__remove-button').addEventListener('click', placeElementRemove);
        placeElement.querySelector('.elements__like-button').addEventListener('click', placeElementLike);
        placeElement.querySelector('.elements__image').addEventListener('click', placeElementOpen);

        return placeElement;
}

// New Card Placing Function
function renderCard(cardData){
    element.prepend(createCard(cardData));
}