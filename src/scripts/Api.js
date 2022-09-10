export class Api {
    constructor(configuration) {
      this._config = configuration;
      this._baseUrl = configuration.baseUrl;
      this._headers = configuration.headers;
    }

    //UPLOADING NEW AVATAR
    upploadAvatar(data){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link,
            })
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка ${res.status}`)
                }
            })
    }

    //GETTING USER INFORMATION
    getUserData(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                } else {
                    return Promise.reject(`Ошбика ${res.status}`)
                }
            })

    }
  
    // INITIAL CARDS SETUP
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => {
            if(res.ok){
                return res.json()
            } else {
                return Promise.reject(`Ошибка ${res.status}`);
            }
        });   
    }

    //USER INFORMATION POSTING
    postUserInfo(inputData){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputData.name,
                about: inputData.job,
            })
            })
                .then(res => {
                    if(res.ok){
                        return res.json()
                    } else {
                        return Promise.reject(`Ошибка ${res.status}`)
                    }
                })
    }

    postNewCard(inputData){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: inputData.name,
                link: inputData.link,
            })
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка ${res.status}`)
                }
            })
    }

    removeCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка ${res.status}`)
                }
            })
    }

    getLikeArr(){
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => {
            if(res.ok){
                return res.json()
            } else {
                return Promise.reject(`Ошибка ${res.status}`);
            }
        });
    }

    putLike(cardId){
        console.log(cardId);
        return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
            method: 'PUT',
            headers: this._headers,
            body: JSON.stringify({
                _id: cardId
            })
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            });
    }


    removeLike(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка ${res.status}`)
                }
            })
    }

}