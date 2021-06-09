var jsonHelper = function () {

    this.readJsonData = function (filePath, objectName) {
        //Import the fs module
        const fs = require('fs');

        //Read the json file into raw data
        let rawdata = fs.readFileSync(filePath);

        //parse the raw data into Json format
        let result = JSON.parse(rawdata);

        return result[objectName];
    };

    this.readConfig = function (configKey) {
        //Import the fs module
        const fs = require('fs');

        let rawdata = fs.readFileSync('infrastructure/configs/config.json');

        let result = JSON.parse(rawdata);

        return result['config'][configKey];
    }
};
module.exports = new jsonHelper();
