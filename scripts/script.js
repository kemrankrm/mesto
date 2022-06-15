// Variables
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup');
let formElementClose = document.querySelector('.popup__close-button');
let formSubmitButton = document.querySelector('.popup__submit-button');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

// Input Values setup
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

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