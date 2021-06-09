const { browser } = require("protractor");
const actionHelper = require("../../infrastructure/helpers/action.helper");
const jsonHelper = require("../../infrastructure/helpers/json.helper");

var dashboardPage = function () {
    let workOrderBtn =  element(by.id('redirectButton'));
    let productionMenu =  element(by.xpath('//span[. = "Production"]'));
    let inventoryMenu =  element(by.xpath('//span[. = "Inventory"]'));
    let purchaseOrdersMenu =  element(by.xpath('//span[. = "Purchase Orders"]'));
    let storagesMenu =  element(by.xpath('//span[. = "Storages"]'));
    let leftMenuInactive =  element(by.css('div.wrapper.sidebar-inactive-l'));
    let hamburgerMenu =  element(by.css('#omega-menu-button'));
    //let resourcesMenu =  element(by.css('span').withExactText("Resources"));

    let resourceMenu = element(by.xpath('//span[. = "Resources"]'));
    let companyMenu = element(by.xpath('//span[. = "Companies"]'));

    this.clickOrderBtn = async function() {
        //Logger.info(`Click on Order button`);
        await actionHelper.clickElement(workOrderBtn);
    };

    this.verifyDashboardPageIsDisplayed = async function() {
        await browser.sleep(2000);
        await expect(browser.getTitle()).toEqual('Titus Vision - Dashboard');
    };

    this.clickPurchaseOrdersMenu = async function() {
        await actionHelper.clickElement(productionMenu);
        await actionHelper.clickElement(purchaseOrdersMenu);
    };

    this.clickCompanyMenu = async function() {
        await actionHelper.clickElement(resourceMenu);
        await actionHelper.clickElement(companyMenu);
    };
};
module.exports = new dashboardPage();
