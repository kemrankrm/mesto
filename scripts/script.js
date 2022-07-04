// Variable Setup
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
let editFormElement = document.querySelector('.popup_type_profile-edit');
let addFormElement = document.querySelector('#popup-np');
let formElementClose = document.querySelector('#pup-close');
const formSubmitButton = document.querySelector('.popup__submit-button');
const newPlaceSubmitButton = document.querySelector('#np-submit');
const newPlaceCloseButton = document.querySelector('#np-close');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let element = document.querySelector('.elements');
let placeName = document.querySelector('.popup__input_type_place-name');
let placeImageUrl = document.querySelector('.popup__input_type_image-url');
let imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButon = document.querySelector('#pi-close');
let bigImage = imagePopup.querySelector('.popup__image');
let citeImage = imagePopup.querySelector('.popup__cite');
const elementTemplate = document.querySelector('#element-template').content;

// Place Cards creation from the initialCards Array
initialCards.forEach(item => {
    let placeElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
    
    placeElement.querySelector('.elements__name').textContent = item.name;
    placeElement.querySelector('.elements__image').setAttribute('src', item.link);
    placeElement.querySelector('.elements__image').setAttribute('alt', item.name);

    element.append(placeElement);
})

// Event Listeners
editButton.addEventListener('click', formOpen);
addButton.addEventListener('click', addFormOpen);
formElementClose.addEventListener('click', formClose);
formSubmitButton.addEventListener('click', formSubmitHandler);
newPlaceCloseButton.addEventListener('click', newPlaceFormClose);
newPlaceSubmitButton.addEventListener('click', newPlaceSubmit);
element.addEventListener('click', placeElementRemove);
element.addEventListener('click', placeElementLike);
element.addEventListener('click', placeElementOpen);
imagePopupCloseButon.addEventListener('click', placeElementClose);



// Functions:
// Edit Form Open Function
function formOpen(){
    editFormElement.classList.add('popup_open');
    editFormElement.classList.remove('popup_close');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

// Place Card Add Form Open Funciton
function addFormOpen(){
    // addFormElement.classList.add('popup-new-place_open');
    console.log(addFormElement.classList.value);
    addFormElement.classList.add('popup_open');
    console.log(addFormElement.classList.value);
    addFormElement.classList.remove('popup_close');
    console.log(addFormElement.classList.value);
    
}

// Edit Form Close Function
function formClose(){
    editFormElement.classList.remove('popup_open');
    editFormElement.classList.add('popup_close');
}

// Place Card Add Form Close Function
function newPlaceFormClose(){
    addFormElement.classList.remove('popup_open');
    addFormElement.classList.add('popup_close');
}

// Edit Form Submit Function
function formSubmitHandler(evt){
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileJob.textContent = `${jobInput.value}`;
    editFormElement.classList.remove('popup_open');
}

// Place Card Submit Funciton
function newPlaceSubmit(evt){
    evt.preventDefault();
    addFormElement.classList.remove('popup_open');
    addFormElement.classList.add('popup_close');
    
    const elementTemplate = document.querySelector('#element-template').content;
    const placeElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
    
    placeElement.querySelector('.elements__name').textContent = placeName.value;
    placeElement.querySelector('.elements__image').setAttribute('src', placeImageUrl.value);
    placeElement.querySelector('.elements__image').setAttribute('alt', placeName.value);
    element.prepend(placeElement);

    placeName.value = 'Название';
    placeImageUrl.value = 'Ссылка на картинку';
}

// Place Card Delete Funciton
function placeElementRemove(evt){
    if(evt.target.classList.value === 'elements__remove-button'){
        evt.target.closest('.elements__element').remove();
    };
}

// Place Card Like Function
function placeElementLike(evt){
    if(evt.target.id === 'like-button'){
        evt.target.classList.toggle('elements__like-button_active');
    };
}

// Place Card Open Function
function placeElementOpen(evt){
    if(evt.target.classList.value === 'elements__image'){
        imagePopup.classList.add('popup_open');
        imagePopup.classList.remove('popup_close');
        bigImage.setAttribute('src', evt.target.getAttribute('src'));
        bigImage.setAttribute('alt', evt.target.getAttribute('alt'));
        citeImage.textContent = evt.target.getAttribute('alt');
        
    }
        
}

function placeElementClose(){
    let asd = imagePopup;
    imagePopup.classList.remove('popup_open');
    imagePopup.classList.add('popup_close');
    console.log(imagePopup === asd);
}