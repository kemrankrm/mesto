const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__button_disabled', // NO NEED SINCE 'DISABLED' ATTRIBUTE USED
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error',
    activeErrorClass: 'popup__input_type_error-active'
};

const showErrorMesage = (inputElement, formElement, {errorClass, activeErrorClass, ...rest}) => {
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
    errorElement.classList.add(errorClass);
    inputElement.classList.add(activeErrorClass);
    // inputElement.classList.remove('popup__input_type_correct'); UNCOMMENT IN CASE OF NEED
    errorElement.textContent = inputElement.validationMessage;
    
};

const hideErrorMesage = (inputElement, formElement, {errorClass, activeErrorClass, ...rest}) => {
    const errorElement = formElement.querySelector(`.popup__${inputElement?.id}-error`);
    inputElement.classList.remove(activeErrorClass);
    // inputElement.classList.add('popup__input_type_correct'); UNCOMMENT IN CASE OF NEED
    errorElement.classList.remove(errorClass);
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

function checkValidity(inputElement, formElement, {...rest}) {
    if(!inputElement.validity.valid){
        showErrorMesage(inputElement, formElement, rest);
    } else if(inputElement.validity.valid){
        hideErrorMesage(inputElement, formElement, rest);
    };
};


function setEventListneres(formElement, { inputSelector, submitButtonSelector, ...rest }){
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

 
    toggleButtonState(hasInvalidInputs(inputs), buttonElement);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            checkValidity(input, formElement, {...rest});
            toggleButtonState(hasInvalidInputs(inputs), buttonElement);})
        });
}


function enableValidition({formSelector, ...rest}){ //{formSelector, ...rest}
    const formElements = Array.from(document.querySelectorAll(formSelector));

    formElements.forEach(form => {
        setEventListneres(form, {...rest}); //setEventListeners({ form, ...rest })
    })
};

enableValidition(config);