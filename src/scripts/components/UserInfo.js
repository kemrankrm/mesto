export class UserInfo{
    constructor(name, description, avatar){
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo(){
        const userInfo = {
            name: this._name.textContent,
            description: this._description.textContent,
            avatar: this._avatar
        }

        return userInfo;
    }

    setUserInfo(inputData){
        this._name.textContent = inputData.name;
        this._description.textContent = inputData.about;
        this._avatar.setAttribute('src', inputData.avatar);
    }
}