const { browser, element } = require("protractor");
const actionHelper = require("../../infrastructure/helpers/action.helper");
const jsonHelper = require("../../infrastructure/helpers/json.helper");

var purchaseOrdersPage = function () {
    let exportButton = element(by.id('exportButton'));

    this.verifyPurchaseOrdersPageIsDisplayed = async function() {
        await browser.sleep(2000);
        await expect(browser.getTitle()).toEqual('Titus Vision - Purchase Orders');
    };

    this.exportPurchaseOrders = async function() {
        await actionHelper.clickElement(exportButton);
        //verify abc xyz
    };
};
module.exports = new purchaseOrdersPage();
