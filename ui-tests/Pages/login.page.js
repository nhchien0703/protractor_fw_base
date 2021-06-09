const actionHelper = require("../../infrastructure/helpers/action.helper");
const jsonHelper = require("../../infrastructure/helpers/json.helper");

var loginPage = function () {
    let usernameInput = element(by.css('#username'));
    let passwordInput = element(by.css('#password'));
    let loginBtn = element(by.css('#login'));

    this.login = async function(username, password) {
        
        await browser.get(await jsonHelper.readConfig('testingUrl'));
        await actionHelper.inputText(usernameInput, username);
        await actionHelper.inputText(passwordInput, password);
        await actionHelper.clickElement(loginBtn);
    };
};
module.exports = new loginPage();
