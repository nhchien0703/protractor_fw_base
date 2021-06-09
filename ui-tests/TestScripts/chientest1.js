const { browser } = require("protractor");
const actionHelper = require("../../infrastructure/helpers/action.helper");
const jsonHelper = require("../../infrastructure/helpers/json.helper");
const companyPage = require("../Pages/company.page");
const dashboardPage = require("../Pages/dashboard.page");
const loginPage = require("../Pages/login.page");
const purchaseOrdersPage = require("../Pages/purchaseOrders.page");
const workOrdersPage = require("../Pages/workOrders.page");

const currentDate = new Date(),
    day = currentDate.getDate(),
    month = currentDate.getMonth() + 1,
    year = currentDate.getFullYear(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    second = currentDate.getSeconds(),
    millisecond = currentDate.getMilliseconds();
const time = day + "." + month + "." + year + "-" + hour + "." + minute + "." + second + "." + millisecond;

describe('Just to test - 1', function() {
    // beforeAll(async function() {
    //     await loginPage.login(jsonHelper.readConfig('username'),jsonHelper.readConfig('password'));
    //     await dashboardPage.verifyDashboardPageIsDisplayed();
    // });

    xit('TC08: Create A Manufacturing Work Order', async function() {
        await dashboardPage.clickProductionMenu();
        await dashboardPage.clickWorkOrders();
        await workOrdersPage.verifyWorkOrdersPageIsDisplayed();
        await workOrdersPage.clickNewBtn();
        await workOrdersPage.clickManufacturingWorkOrder();
        await workOrdersPage.verifyNewManufacturingWorkOrderIsDisplayed();
        await workOrdersPage.inputFormNewManufacturingWO("123456", "TMA-2k", null, "6", "WOM-00028123", "00078308 (78309)", "123123");
        await workOrdersPage.clickDismissBtn();
        await workOrdersPage.verifyPopUpDiscardYourChanges();
        await workOrdersPage.clickYesBtn();
    });

    xit('TC09: Add New Company', async function() {
        await dashboardPage.clickCompanyMenu();
        await companyPage.clickNewButton();
        await companyPage.addNewCompany('TC09_' + time, 'nguyen', '123', 'Contact', 'USD', "test", 'FAX', '123456789', 'HOME', 'TC09@tma.com.vn');
        // await companyPage.verifyCompanyRecordByName('chien1', 'nguyen');
    });

    it('Test1', async function() {
        console.log("test1-step1");
        console.log("test1-step2");
    });

    it('Test2', async function() {
        throw "test2 failed";
    });

    it('Test3', async function() {
        console.log("test3");
    });

  });