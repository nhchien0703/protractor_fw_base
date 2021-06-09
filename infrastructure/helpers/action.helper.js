const { browser, protractor } = require("protractor");
const jsonHelper = require("./json.helper");

function actionHelper(){}

actionHelper.prototype.clickElement = async function (webElement) {
    let er = '';
    for(let i = 0; i< jsonHelper.readConfig("retryTime");i++){
        try {
            await this.waitForPresenceOf(webElement);
            await this.waitForElementToBeClickable(webElement);
            await webElement.click();
            er = '';
            break;
        } catch (e) {
            er = e;
            browser.sleep(500);
        }
    }
    
    if(er !== '')
        throw er;
};

actionHelper.prototype.inputText = async function (webElement, text) {
    let er = '';
    for(let i = 0; i< jsonHelper.readConfig("retryTime");i++){
        try {
            await this.waitForPresenceOf(webElement);
            await webElement.clear();
            await webElement.sendKeys(text);
            er = '';
            break;
        } catch (e) {
            er = e;
            browser.sleep(500);
        }
    }

    if(er !== '')
        throw er;
};

actionHelper.prototype.expectedConditions = async function (webElement, expectedCondition) {
    let er = '';
    for(let i = 0; i< jsonHelper.readConfig("retryTime");i++){
        try{
            switch (expectedCondition) {
                case 'waitForPresenceOf':
                    await browser.wait(
                        protractor.ExpectedConditions.presenceOf(webElement),
                        browser.timeoutInterval
                    );
                    break;
                case 'waitForElementToBeClickable':
                    await browser.wait(
                        protractor.ExpectedConditions.elementToBeClickable(webElement),
                        browser.timeoutInterval
                    );
                    break;
                case 'waitForVisibilityOf':
                    await browser.wait(
                        protractor.ExpectedConditions.visibilityOf(webElement),
                        browser.timeoutInterval
                    );
                    break;
            }
            er = '';
            break;
        } catch (e) {
            er = e;
        }
    }
    if(er !== '')
        throw er;
};

actionHelper.prototype.waitForVisibilityOf = async function (webElement) {
    await this.expectedConditions(webElement, 'waitForVisibilityOf');
};

actionHelper.prototype.waitForPresenceOf = async function (webElement) {
    await this.expectedConditions(webElement, 'waitForPresenceOf');
};

actionHelper.prototype.waitForElementToBeClickable = async function (webElement) {
    await this.expectedConditions(webElement, 'waitForElementToBeClickable');
};

actionHelper.prototype.waitForTitleContainsText = async function (title) {
    await browser.wait(
        protractor.ExpectedConditions.titleContains(title),
        browser.timeoutInterval
    );
};

actionHelper.prototype.getInnerText = async function (webElement) {
    let er = '';
    let rs = '';
    for(let i = 0; i< jsonHelper.readConfig("retryTime");i++){
        try {
            await this.waitForPresenceOf(webElement);
            await webElement.getText();
            er = '';
            break;
        } catch (e) {
            er = e;
            browser.sleep(500);
        }
    }

    if(er !== '')
        throw er;
    else
        return rs;
};

actionHelper.prototype.selectItemInPDropDown = async function (webElement, value) {
    try {
        await this.waitForPresenceOf(webElement);
        await webElement.click();
        
        var ddlItem = element.all(by.xpath('//p-dropdownitem[. = "' + value + '"]')).first();
        await this.waitForVisibilityOf(ddlItem);
        await ddlItem.click();
    } catch (e) {
        throw "Couldn't select '" + value + "' from p-dropdown '" + webElement + "'. Detail : " + e
    }
};

actionHelper.prototype.getTableCellValue = async function (tableBody , row, column) {
    try {
        await this.waitForPresenceOf(tableBody);
        var allRows = tableBody.all(by.tagName('tr'));
        var row = allRows.get(row).all(by.tagName('td'));
        var cell = row.get(column);
        return cell.getText();
    } catch (e) {
        throw "Couldn't get value for row '" + row + "', column '" + column + "' of table '" + tableBody + "'. Detail : " + e
    }
};


module.exports = new actionHelper();