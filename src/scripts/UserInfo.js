export class UserInfo{
    constructor(name, description){
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
    }

    getUserInfo(){
        const name = this._name.textContent;
        const description = this._description.textContent;

        return {name: name, description: description};
    }

    setUserInfo(inputData){
        this._name.textContent = inputData.name;
        this._description.textContent = inputData.about;
    }
}