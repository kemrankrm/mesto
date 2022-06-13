// Variables
let editButton = document.querySelector('.profile__editButton');
let formElement = document.querySelector('.popup');
let formElementClose = document.querySelector('.popup__closeButton');
let formSubmitButton = document.querySelector('.popup__submitButton');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

// Event Listeners
editButton.addEventListener('click', formOpen);
formElementClose.addEventListener('click', formClose);
formSubmitButton.addEventListener('click', formSubmitHandler);

// Functions
function formOpen(){
    formElement.classList.add('popup_opened');
}

function formClose(){
    formElement.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileJob.textContent = `${jobInput.value}`;
    formElement.classList.remove('popup_opened');
}