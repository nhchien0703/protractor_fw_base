var jsonHelper = require('./infrastructure/helpers/json.helper');
var fs = require('fs');
var log4js = require('log4js');
var q = require('q');

exports.config = {
    //Address of selenium server
    seleniumAddress: 'http://192.168.36.212:4444/wd/hub',
    framework: 'jasmine',
    SELENIUM_PROMISE_MANAGER: true,
    restartBrowserBetweenTests: false,
    directConnect: true,

    capabilities: {
        browserName: 'chrome',
        ignoreProtectedModeSettings: true,
        ignoreZoomSetting: true,
        requireWindowFocus: true,
        javascriptEnabled: true,
        // shardTestFiles: true,
        chromeOptions: {
            args:['--window-size=1920,1080']
        }
    },

    //Scripts what will be executed
    suites: {
        full: 'ui-tests/TestScripts/*.js',
        chien: 'ui-tests/TestScripts/chientest.js',
        chien1: 'ui-tests/TestScripts/chientest1.js'
    },
    
    onPrepare: function () {
        browser.timeoutInterval = 5000;
        browser.waitForAngularEnabled(false);

        browser.logger = log4js.getLogger('Logger');

        // html reporter 2
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './report/',
            filePrefix: 'xmlresults'
        }));


        // generate screenshot
        var fs = require('fs-extra');

        fs.emptyDir('./report/screenshots', function (err) {
            console.log(err);
        });

        jasmine.getEnv().addReporter({
            specDone: function (result) {
                if (result.status == 'failed') {
                browser.getCapabilities().then(function (caps) {
                    var browserName = caps.get('browserName');

                    browser.takeScreenshot().then(function (png) {
                    var stream = fs.createWriteStream('./report/screenshots/' + browserName + '-' + result.fullName + '.png');
                    stream.write(new Buffer(png, 'base64'));
                    stream.end();
                    });
                });
                }
            }
        });
    },

    jasmineNodeOpts: {
        // If true, print colors to the terminal.
        showColors: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000,
        
    },

    //HTMLReport called once tests are finished
    onComplete: function () {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            var HTMLReport = require('protractor-html-reporter-2');

            testConfig = {
                reportTitle: 'Protractor Test Execution Report',
                outputPath: './report/',
                outputFilename: 'ProtractorTestReport',
                screenshotPath: './screenshots/',
                testBrowser: 'chrome',
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };
            new HTMLReport().from('./report/xmlresults.xml', testConfig);
        });
    },
};
