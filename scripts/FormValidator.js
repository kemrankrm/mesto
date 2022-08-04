export class FormValidator{
    constructor(data){
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._activeErrorClass = data.activeErrorClass;

    }

    _showErrorMesage = (inputElement, formElement) => {
        const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
        errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._activeErrorClass);
        // inputElement.classList.remove('popup__input_type_correct'); UNCOMMENT IN CASE OF NEED
        errorElement.textContent = inputElement.validationMessage;
        
    };
    
    _hideErrorMesage = (inputElement, formElement) => {
        const errorElement = formElement.querySelector(`.popup__${inputElement?.id}-error`);
        inputElement.classList.remove(this._activeErrorClass);
        // inputElement.classList.add('popup__input_type_correct'); UNCOMMENT IN CASE OF NEED
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };
    
    _hasInvalidInputs(inputs) {
        return inputs.some(input => {
            return !input.validity.valid;
        });
    };


    _toggleButtonState(state, button) {
        if(state){
            button.setAttribute('disabled','');
        } else if(!state){
            button.removeAttribute('disabled');
        }
    };
    
    _checkValidity(inputElement, formElement) {
        if(!inputElement.validity.valid){
            this._showErrorMesage(inputElement, formElement);
        } else if(inputElement.validity.valid){
            this._hideErrorMesage(inputElement, formElement);
        };
    };

    _setEventListeners(formElement){
        const inputs = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
    
     
        this._toggleButtonState(this._hasInvalidInputs(inputs), buttonElement);
    
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._checkValidity(input, formElement);
                this._toggleButtonState(this._hasInvalidInputs(inputs), buttonElement);})
            });
    }

    enableValidation(){
        const formElements = Array.from(document.querySelectorAll(this._formSelector));
        console.log(formElements);
        formElements.forEach(form => {
            this._setEventListeners(form);}); //setEventListeners({ form, ...rest })
    }
}