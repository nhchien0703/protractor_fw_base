const { browser, element, by } = require("protractor");
const actionHelper = require("../../infrastructure/helpers/action.helper");
const jsonHelper = require("../../infrastructure/helpers/json.helper");

var workOrdersPage = function () {

    let yesBtn                  = element(by.xpath('//button[@label="Yes"]'));
    let noBtn                   = element(by.xpath('//button[@label="No"]'));
    let todayBtn                = element(by.xpath("//span[text()='Today']"));
    let clearBtn                = element(by.xpath("//span[text()='Clear']"));
    let textBoxProduct          = element(by.id("Product"));
    let textBoxJobNumber        = element(by.id("JobNumber"));
    let textBoxIntendedForWO    = element(by.id("IntendedForWO"));
    let textBoxNotes            = element(by.id("Notes"));
    let dismissBtn              = element(by.xpath('//span[text()="Dismiss"]'));
    let okBtn                   = element(by.xpath('//span[text()="OK"]'));
    let textBoxShipmentDate     = element(by.xpath("//input[@placeholder='Shipment Date']"));
    let newBtn                  = element(by.xpath('//span[contains(text(),"New")]'));
    let newManufacturingWO      = element(by.xpath('//span[contains(text(),"Manufacturing WO")]'));
    let newPartsWO              = element(by.xpath('//span[contains(text(),"Parts WO")]'));
    let formNewManufacturingWorkOrder = element(by.xpath('//h2[contains(text(),"New Manufacturing Work Order")]'));
    let textBoxWorkOrderQuantity      = element(by.xpath('//input[@placeholder="Work Order Quantity"]'));
    let textBoxIntendedForProduct     = element(by.id("IntendedForProduct"));
    let popUpConfirmation             = element(by.xpath('//span[text()="Confirmation"]'));
    let messageDiscardYourChange      = element(by.xpath('//div[@class="ui-dialog-content ui-widget-content"]')); 



    this.verifyPopUpDiscardYourChanges = async function() {
        await actionHelper.waitForPresenceOf(popUpConfirmation);
        await expect(messageDiscardYourChange.getText()).toEqual('Data in the form was changed. Are you sure you would like to discard your changes?');
    };

    this.verifyWorkOrdersPageIsDisplayed = async function() {
        await browser.sleep(5000);
        await expect(browser.getTitle()).toEqual('Titus Vision - Work Orders');
    };

    this.verifyNewManufacturingWorkOrderIsDisplayed = async function() {
        await browser.sleep(2000);
        await expect(formNewManufacturingWorkOrder.getText()).toEqual('New Manufacturing Work Order');
    };

    this.clickNewBtn = async function() {
        await actionHelper.clickElement(newBtn);
    };

    this.clickManufacturingWorkOrder = async function() {
        await actionHelper.clickElement(newManufacturingWO);
    };

    this.clickPartsWorkOrder = async function() {
        await actionHelper.clickElement(newPartsWO);
    };

    this.inputJobNumber = async function(stringData) {
        await actionHelper.inputText(textBoxJobNumber, stringData);
    };

    this.inputProduct = async function(stringData) {
        await actionHelper.inputText(textBoxProduct, stringData);
    };

    this.inputWorkOrderQuantity = async function(stringData) {
        await actionHelper.inputText(textBoxWorkOrderQuantity, stringData);
    };

    this.inputIntendedForWO = async function(stringData) {
        await actionHelper.inputText(textBoxIntendedForWO, stringData);
    };

    this.inputIntendedForProduct = async function(stringData) {
        await actionHelper.inputText(textBoxIntendedForProduct, stringData);
    };

    this.inputNotes = async function(stringData) {
        await actionHelper.inputText(textBoxNotes, stringData);
    };

    this.clickDismissBtn = async function() {
        await actionHelper.clickElement(dismissBtn);
    };

    this.clickOKBtn = async function() {
        await actionHelper.clickElement(okBtn);
    };

    this.clickYesBtn = async function() {
        await actionHelper.clickElement(yesBtn);
    };

    this.clickNoBtn = async function() {
        await actionHelper.clickElement(noBtn);
    };    

    this.pickShipmentDate = async function(dateTime) {
        if(dateTime !== null) {
            // Set date by string
            await actionHelper.inputText(textBoxShipmentDate, dateTime);
            await actionHelper.clickElement(formNewManufacturingWorkOrder);
        }
        else{
            // Set Shipment date equal current date
            await actionHelper.clickElement(textBoxShipmentDate);
            await actionHelper.clickElement(clearBtn);
            await actionHelper.clickElement(textBoxShipmentDate);
            await actionHelper.clickElement(todayBtn);
        }
    };

    this.inputFormNewManufacturingWO = async function(jobNumber, product, dateTime, number, indentededWO, indentededProduct, notes) {
        await this.inputJobNumber(jobNumber);
        await this.inputProduct(product);
        await this.pickShipmentDate(dateTime);
        await this.inputWorkOrderQuantity(number);
        await this.inputIntendedForWO(indentededWO);
        await this.inputIntendedForProduct(indentededProduct)
        await this.inputNotes(notes);
    };
    
};
module.exports = new workOrdersPage();
