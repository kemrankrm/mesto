//Importing Data
import { Api } from "./Api.js";
import { Card } from "./Card.js";
import { Section }from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { config,
        editProfileButton,
        addButton,
        formEditProfile,
        formAddCard,
        formEditAvatar,
        nameInput,
        jobInput,
        editAvatarButton,
        avatarImage,
        removePopup,
        ownerId,
        buttonForFormAddCardSubmit,
        buttonForFormEditProfileSubmit,
        buttonForAvatarEdition
        } from "./utils/constants.js";
import { api } from "./utils/utils.js";
import '../pages/index.css';

api.getInitialCards()
    .then(res => {
        newCard.renderItem(res.reverse())
    });
    
api.getUserData()
    .then((res) => {
        document.querySelector('.profile__name').textContent = res.name;
        document.querySelector('.profile__description').textContent = res.about;
        document.querySelector('.profile__avatar').setAttribute('src', res.avatar);
    });

//Validation Initializing
const formSelectors = [formEditProfile.id, formAddCard.id, formEditAvatar.id];
const editFormValidator = new FormValidator(config, formSelectors[0]);
const addFormValidator = new FormValidator(config, formSelectors[1]);
const avatarFormValidator = new FormValidator(config, formSelectors[2]);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const profInfo= new UserInfo('.profile__name', '.profile__description');
const openImagePopup = new PopupWithImage('.popup_type_image');
openImagePopup.setEventListeners()

const editAvatarForm = new PopupWithForm('.popup_type_edit-avatar', {
    submitter: (data) => {
        buttonForAvatarEdition.value = 'Сохранение...'
        api.upploadAvatar(data)
            .then(res => {
                avatarImage.setAttribute('src', res.avatar);
                document.forms.avatarForm.reset();
                editAvatarForm.close();
                buttonForAvatarEdition.value = 'Сохранить'
            })
    }
});

editAvatarForm.setEventListeners();

const addPlaceForm = new PopupWithForm('.popup_type_new-place', {
    submitter: (data) => {
                console.log(buttonForFormAddCardSubmit);
                buttonForFormAddCardSubmit.value = 'Сохранение...'
                api.postNewCard(data)
                    .then(res => {
                        newCard.renderItem([res]);
                        addPlaceForm.close();
                        buttonForFormAddCardSubmit.value = 'Сохранить'
                        document.forms.addForm.reset();
                        addFormValidator.toggleButtonState();
                    })
                    .catch(err => console.log('error'));
                
    }
});

addPlaceForm.setEventListeners();

const editForm = new PopupWithForm('.popup_type_profile-edit', {
    submitter: (data) => {
        buttonForFormEditProfileSubmit.value = 'Сохрание...'
        api.postUserInfo(data)
            .then(res => {
                profInfo.setUserInfo(res);
                editForm.close();
                buttonForFormEditProfileSubmit.value = 'Сохранить'
            });
        
    }
});
editForm.setEventListeners();

// Event Listeners
editAvatarButton.addEventListener('click', () => {
    editAvatarForm.open();
    avatarFormValidator.toggleButtonState();
    avatarFormValidator.clearValidationErrors();
})

editProfileButton.addEventListener('click', () => {
    const profInfoCont = profInfo.getUserInfo();
   
    nameInput.value = profInfoCont.name;
    jobInput.value = profInfoCont.description;
    editFormValidator.toggleButtonState();
    editFormValidator.clearValidationErrors();

    editForm.open();
});

addButton.addEventListener('click', () => {
    addFormValidator.clearValidationErrors();
    addPlaceForm.open();
});

// Card Element creation
function creatCardElement(cardData){
    const card = new Card(cardData, '#element-template', ownerId, {
        handleCardClick: () => {
            openImagePopup.open(cardData.name, cardData.link);
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

