//Importing Data
import { Card } from "./Card.js";
import { Section }from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { initialCards } from "./cards.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { config,
        editButton,
        addButton,
        formEditProfile,
        formAddCard,
        nameInput,
        jobInput} from "./utils/constants.js";
import '../pages/index.css';

//Validation Initializing
const formSelectors = [formEditProfile.id, formAddCard.id];
const editFormValidator = new FormValidator(config, formSelectors[0]);
const addFormValidator = new FormValidator(config, formSelectors[1]);
editFormValidator.enableValidation();
addFormValidator.enableValidation();


const openImagePopup = new PopupWithImage('.popup_type_image');

const addPlaceForm = new PopupWithForm('.popup_type_new-place', {
    submitter: (data) => {
        newCard.renderItem([data]);
        addPlaceForm.close();
        document.forms.addForm.reset();
        addFormValidator.enableValidation();
    }
});
addPlaceForm.setEventListeners();

const editForm = new PopupWithForm('.popup_type_profile-edit', {
    submitter: (data) => {
        const userInfo = new UserInfo('.profile__name', '.profile__description');
        userInfo.setUserInfo(data);
        editForm.close();
        editFormValidator.enableValidation();
    }
});
editForm.setEventListeners();

// Event Listeners
editButton.addEventListener('click', () => {
    const profInfo= new UserInfo('.profile__name', '.profile__description');
    const profInfoCont = profInfo.getUserInfo();
   
    nameInput.value = profInfoCont.name;
    jobInput.value = profInfoCont.description;
    editFormValidator.enableValidation();
    editFormValidator.clearValidationErrors();
    editForm.open();
});

addButton.addEventListener('click', () => {
    addFormValidator.clearValidationErrors();
    addPlaceForm.open();
});

// Card Element creation
function creatCardElement(cardData){
    const card = new Card(cardData, '#element-template', {
        handleCardClick: () => {
            openImagePopup.open(cardData.name, cardData.link);
            openImagePopup.setEventListeners()
        }
    });

    return card
}

const newCard = new Section({
    renderer: (item) => {
        const cardElement = creatCardElement(item).generateCard();
        newCard.addItem(cardElement);
    }
}, '.elements');

// Initial Cards Generation
newCard.renderItem(initialCards);