const { browser, element } = require("protractor");
const actionHelper = require("../../infrastructure/helpers/action.helper");
const jsonHelper = require("../../infrastructure/helpers/json.helper");

var companyPage = function () {
    let exportButton            = element(by.id('exportButton'));
    let newButton               = element(by.id('New'));
    let nameInput               = element(by.id('Name'));
    let longNameInput           = element(by.id('LongName'));
    let ABNInput                = element(by.id('ABN'));
    let typeDropdown            = element(by.id('CompanyType'));
    let typeDropdownLabel       = element(by.xpath('//p-dropdown[@id="CompanyType"]//label'));
    let currencyDropdown        = element(by.id('Currency'));
    let currencyDropdownLabel   = element(by.xpath('//p-dropdown[@id="Currency"]//label'));
    let noteInput               = element(by.id('Notes'));
    let addButtons              = element.all(by.xpath('//span[. = "Add"]'));

    let phoneTypeDefault        = element.all(by.xpath('//div[contains(text(), "WORK")]')).first();
    let emailTypeDefault        = element.all(by.xpath('//div[contains(text(), "WORK")]')).last();

    let phoneTypeDownArrow      = element.all(by.xpath('//p-dropdown[starts-with(@id,"Type")]//span')).first();
    let emailTypeDownArrow      = element.all(by.xpath('//p-dropdown[starts-with(@id,"Type")]//span')).last();

    let phoneTypeNumberInput    = element(by.xpath("//input[starts-with(@id,'Number')]"));
    let phoneTypeNumberDisplay  = element.all(by.xpath("//td[starts-with(@id,'Number')]")).last();

    let emailTypeEmailInput     = element(by.xpath("//input[starts-with(@id,'Address')]"));
    let emailTypeNumberDisplay  = element.all(by.xpath("//td[starts-with(@id,'Address')]")).last();

    let dismissButton           = element(by.id('Dismiss'));
    let okButton                = element(by.id('OK'));
    let searchBox               = element(by.xpath('//input[@placeholder="  Search"]'));
    let filter                  = element(by.xpath('//span[contains(text(),"filters")]'));

    //company table
    let companyTable            = element(by.xpath('//table[contains(@class,"ui-table-scrollable-body-table")]'));

    /**
     * Verify Company Page is accessed
     */
    this.verifyCompanyPageIsDisplayed = async function() {
        await browser.sleep(2000);
        await expect(browser.getTitle()).toEqual('Titus Vision - Companies');
    };

    /**
     * Click new button
     */
    this.clickNewButton = async function() {
        await actionHelper.clickElement(newButton);
    }

    /**
     * Add new company
     */
    this.addNewCompany = async function(companyName, companyLongName, ABN, companyType, currency, notes, phoneType, phoneNumber, emailType, emailAddress) {
        // input text to input fields
        await actionHelper.inputText(nameInput, companyName);
        await actionHelper.inputText(longNameInput, companyLongName);
        await actionHelper.inputText(ABNInput, ABN);
        await actionHelper.inputText(noteInput, notes);

        // select company type
        await actionHelper.selectItemInPDropDown(typeDropdown, companyType);
        await this.verifyCompanyTypeValue(companyType);

        // select currency type
        await actionHelper.selectItemInPDropDown(currencyDropdown, currency);
        await this.verifyCurrencyValue(currency);

        // Add phone
        await this.addPhoneNumber(phoneType, phoneNumber);

        // Add email
        await this.addEmailAddress(emailType, emailAddress);

        // OK
        await actionHelper.clickElement(okButton);
        await actionHelper.waitForTitleContainsText('Titus Vision - Company: ' + companyName);

    }

    /**
     * To add phone number when input value
     */
    this.addPhoneNumber = async function(type, number) {
        await actionHelper.clickElement(addButtons.first());
        await actionHelper.clickElement(phoneTypeDefault);
        await actionHelper.selectItemInPDropDown(phoneTypeDownArrow, type);
        await this.verifyPhoneTypeValue(type);
        await actionHelper.clickElement(phoneTypeNumberDisplay);
        await actionHelper.inputText(phoneTypeNumberInput, number);
    }

    /**
     * To add email address when input value
     */
    this.addEmailAddress = async function(type, email) {
        await actionHelper.clickElement(addButtons.last());
        await actionHelper.clickElement(emailTypeDefault);
        await actionHelper.selectItemInPDropDown(emailTypeDownArrow, type);
        await this.verifyEmailTypeValue(type);
        await actionHelper.clickElement(emailTypeNumberDisplay);
        await actionHelper.inputText(emailTypeEmailInput, email);
    }

    /**
     * To verify company type after select from p-dropdown
     */
    this.verifyCompanyTypeValue = async function (value) {
        await actionHelper.waitForPresenceOf(typeDropdownLabel);
        await expect(typeDropdownLabel.getText()).toEqual(value);
    };

    /**
     * To verify currency after select from p-dropdown
     */
    this.verifyCurrencyValue = async function (value) {
        await actionHelper.waitForPresenceOf(currencyDropdownLabel);
        await expect(currencyDropdownLabel.getText()).toEqual(value);
    };

    /**
     * To verify phone type after select from p-dropdown
     */
    this.verifyPhoneTypeValue = async function (value) {
        var phoneTypeValue = element.all(by.xpath("//div[contains(text(), '" + value + "')]")).first();
        await actionHelper.waitForPresenceOf(phoneTypeValue);
    };

    /**
     * To verify email type after select from p-dropdown
     */
    this.verifyEmailTypeValue = async function (value) {
        var emailTypeValue = element.all(by.xpath("//div[contains(text(), '" + value + "')]")).last();
        await actionHelper.waitForPresenceOf(emailTypeValue);
    };

    /**
     * To verify Company Record By Name
     */
    this.verifyCompanyRecordByName = async function(name, longName) {       
        //search record by name
        await actionHelper.inputText(searchBox, name);
        await actionHelper.clickElement(filter);
        await browser.sleep(2000);

        try {
            for (let i=0; i<10; i++) {
                var recordName = await actionHelper.getTableCellValue(companyTable, i, 1);

                if (recordName === name) {
                    // get record field values
                    var recordLongName = await actionHelper.getTableCellValue(companyTable, i, 2);

                    // verify
                    await expect(recordName).toEqual(name);
                    await expect(recordLongName).toEqual(longName); 

                    return;       
                }   
            } 
            throw "Can't found any company record with name = '" + name + "'"
        } catch (e) {
            throw "Can't found any company record with name = '" + name + "'"
        } 
    }
};
module.exports = new companyPage();
