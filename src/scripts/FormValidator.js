export class FormValidator{
    constructor(data, formSelector){
        this._formSelector = formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._activeErrorClass = data.activeErrorClass;
        this._formElements = document.querySelector(`#${this._formSelector}`);
        this._inputElements = Array.from(this._formElements.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElements.querySelector(this._submitButtonSelector);

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

    toggleButtonState() {
        const validityState = this._inputElements.some(input => {
            return !input.validity.valid;});
        if(validityState){
            this._submitButton.setAttribute('disabled','');
        } else if(!validityState){
            this._submitButton.removeAttribute('disabled');
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
        this._inputElements.forEach(input => {
                this._checkValidity(input, formElement);
                this.toggleButtonState();
            });
        
        this._inputElements.forEach(input => {
            input.addEventListener('input', () => {
                this._checkValidity(input, formElement);
                this.toggleButtonState();
            })
            });
    }

//Public Method
    clearValidationErrors(){
        this._inputElements
        .forEach(input => {
            this._hideErrorMesage(input, this._formElements);
        });
    }

//Public Method
    enableValidation(){
        this._setEventListeners(this._formElements);
    }
}