// Variables
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup');
let formElementClose = document.querySelector('.popup__close-button');
let formSubmitButton = document.querySelector('.popup__submit-button');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

// Event Listeners
editButton.addEventListener('click', formOpen);
formElementClose.addEventListener('click', formClose);
formSubmitButton.addEventListener('click', formSubmitHandler);

// Functions (я до конца не понимаю что именно от меня требуется).
function formOpen(){
    formElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function formClose(){
    formElement.classList.remove('popup_opened');
}

function formSubmitHandler(evt){
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileJob.textContent = `${jobInput.value}`;
    formElement.classList.remove('popup_opened');
}