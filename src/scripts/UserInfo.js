export class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    }

    getUserInfo() {
        this._userData = {};
        this._userData['name'] = this._nameElement.textContent;
        this._userData['job'] = this._jobElement.textContent;
        return this._userData;
    }

    setUserInfo({ data }) {
        this._nameElement.textContent = data.name;
        this._jobElement.textContent = data.job;
    }
}