const showErrorMesage = (inputElement, formElement) => {
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
    errorElement.classList.add('popup__error');
    inputElement.classList.add('popup__input_type_error-active');
    // inputElement.classList.remove('popup__input_type_correct'); UNCOMMENT IN CASE OF NEED
    errorElement.textContent = inputElement.validationMessage;
    
};

const hideErrorMesage = (inputElement, formElement) => {
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error-active');
    // inputElement.classList.add('popup__input_type_correct'); UNCOMMENT IN CASE OF NEED
    errorElement.classList.remove('popup__error');
    errorElement.textContent = '';
};

function hasInvalidInputs(inputs) {
    return inputs.some(input => {
        return !input.validity.valid;
    });
};

function toggleButtonState(state, button) {
    if(state){
        button.setAttribute('disabled','');
    } else if(!state){
        button.removeAttribute('disabled');
    }
};

function checkValidity(inputElement, formElement) {
    console.log('DONE')
    if(!inputElement.validity.valid){
        showErrorMesage(inputElement, formElement);
    } else if(inputElement.validity.valid){
        hideErrorMesage(inputElement, formElement);
    };

};


function setEventListneres(formElement){
    const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');

    toggleButtonState(hasInvalidInputs(inputs), buttonElement);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            checkValidity(input, formElement);
            toggleButtonState(hasInvalidInputs(inputs), buttonElement);})
        });
}


function enableValidition(){ //{formSelector, ...rest}
    const formElements = Array.from(document.querySelectorAll('.popup__form'));

    formElements.forEach(form => {
        setEventListneres(form); //setEventListeners({ form, ...rest })
    })
};

MediaStreamAudioDestinationNode;

enableValidition();

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   });

  //spred syntaxis