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
        formAddCard} from "./utils/constants.js";

//Validation Initializing
const formSelectors = [formEditProfile.id, formAddCard.id];
const editFormValidator = new FormValidator(config, formSelectors[0]);
const addFormValidator = new FormValidator(config, formSelectors[1]);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Initial Cards Generation
cardRenderer(initialCards);

// Event Listeners
editButton.addEventListener('click', () => {

    const editForm = new PopupWithForm('.popup_type_profile-edit', {
        submitter: (data) => {
            const userInfo = new UserInfo('.profile__name', '.profile__description');
            userInfo.setUserInfo(data);
            editForm.close();
        }
    });
    
    const profInfo = new UserInfo('.profile__name', '.profile__description');
    document.forms.editForm.elements.name.value = profInfo.getUserInfo().name;
    document.forms.editForm.elements.job.value = profInfo.getUserInfo().description;
    
    editForm.open();
});

addButton.addEventListener('click', () => {
    const addPlaceForm = new PopupWithForm('.popup_type_new-place', {
        submitter: (data) => {
            cardRenderer([data]);
            addPlaceForm.close();
            document.forms.addForm.reset();
        }
    })
    addPlaceForm.open();    
});

function cardRenderer(cardInfo){
    const newCard = new Section({ 
        data: cardInfo,
        renderer: (item) => {
            const card = new Card(item, '#element-template', {
                handleCardClick: () => {
                    const openImagePopup = new PopupWithImage('.popup_type_image', item.name, item.link);
                    openImagePopup.open();
                    openImagePopup.setEventListeners()
                }
            });
            
            const cardElement = card.generateCard();
            newCard.addItem(cardElement);
        }
    }, '.elements');
    
    newCard.renderItem();
}