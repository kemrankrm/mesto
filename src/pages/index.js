//Importing Data
import { Api } from "../scripts/components/Api.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js"
import { UserInfo} from "../scripts/components/UserInfo.js"
import { FormValidator } from "../scripts/components/FormValidator.js"

import { config,
        editProfileButton,
        addButton,
        formEditProfile,
        formAddCard,
        formEditAvatar,
        nameInput,
        jobInput,
        editAvatarButton,
        ownerId,
        buttonForFormAddCardSubmit,
        buttonForFormEditProfileSubmit,
        buttonForAvatarEdition
        } from "../scripts/utils/constants.js";
import { api } from "../scripts/utils/utils.js";
import '../pages/index.css';

Promise.all([api.getInitialCards(),api.getUserData()])
        .then(res => {
            profInfo.setUserInfo(res[1]);
            newCard.renderItem(res[0].reverse());
        })
        .catch((err) => console.log(err));    


//Validation Initializing
const formSelectors = [formEditProfile.id, formAddCard.id, formEditAvatar.id];
const editFormValidator = new FormValidator(config, formSelectors[0]);
const addFormValidator = new FormValidator(config, formSelectors[1]);
const avatarFormValidator = new FormValidator(config, formSelectors[2]);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const profInfo= new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
const openImagePopup = new PopupWithImage('.popup_type_image');
openImagePopup.setEventListeners()

const editAvatarForm = new PopupWithForm('.popup_type_edit-avatar', {
    submitter: (data) => {
        buttonForAvatarEdition.value = 'Сохранение...'
        api.upploadAvatar(data)
            .then(res => {
                profInfo.setUserInfo(res);
                editAvatarForm.close();   
            })
            .catch((err) => {
                console.log(err)})
            .finally(() => {
                buttonForAvatarEdition.value = 'Сохранить';
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
            })
            .catch((err) => {
                console.log(err)});
        
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
    addFormValidator.toggleButtonState();
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

