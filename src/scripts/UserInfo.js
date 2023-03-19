export class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        this._userData = {};
        this._userData['name'] = this._nameElement.textContent;
        this._userData['about'] = this._jobElement.textContent;
        return this._userData;
    }

    setUserInfo({ data }) {
        if (data.avatar) {
            this._avatarElement.style.backgroundImage = `url("${data.avatar}")`;
        }
        if (data.name) {
            this._nameElement.textContent = data.name;
        }
        if (data.about) {
            this._jobElement.textContent = data.about;
        }
    }
}