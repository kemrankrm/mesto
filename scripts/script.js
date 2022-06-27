// Variables
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let formElement = document.querySelector('.popup');
let addFormElement = document.querySelector('.popup-new-place');
let formElementClose = document.querySelector('.popup__close-button');
let formSubmitButton = document.querySelector('.popup__submit-button');
let newPlaceSubmitButton = document.querySelector('#np-submit');
let newPlaceCloseButton = document.querySelector('#np-close');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');


// Event Listeners
editButton.addEventListener('click', formOpen);
addButton.addEventListener('click', addFormOpen);
formElementClose.addEventListener('click', formClose);
formSubmitButton.addEventListener('click', formSubmitHandler);
newPlaceCloseButton.addEventListener('click', newPlaceFormClose);
newPlaceSubmitButton.addEventListener('click', newPlaceSubmit);

// Functions.
function formOpen(){
    formElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function addFormOpen(){
    addFormElement.classList.add('popup-new-place_open');
}

function formClose(){
    formElement.classList.remove('popup_opened');
}

function newPlaceFormClose(){
    addFormElement.classList.remove('popup-new-place_open');
}

function formSubmitHandler(evt){
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileJob.textContent = `${jobInput.value}`;
    formElement.classList.remove('popup_opened');
}

function newPlaceSubmit(evt){
    evt.preventDefault();
    addFormElement.classList.remove('popup-new-place_open');
}



let elementLike = document.querySelector('.elements');

elementLike.addEventListener('click', evt => {
    
    console.log(evt.target.type === 'button');
    if (evt.target.type === 'button'){
    evt.target.classList.toggle('elements__like-button_active');
    console.log(evt.target.classList);};
})