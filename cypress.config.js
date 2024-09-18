const { defineConfig } = require("cypress");
const { tabNavigation, setDebuggingPort } = require("./cypress/support/utils/tabNavigation");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    setupNodeEvents(on, config) {

      require('cypress-html-reporter/GenerateReport')(on, config)

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          const debuggingPort = launchOptions.args.find(
            (arg) => arg.slice(0, 23) === '--remote-debugging-port',
          );
          setDebuggingPort(debuggingPort.split('='));
        }
        return launchOptions;
      });

      on('task', {
        tabNavigation
      });

    },
    env: {
      // MY_ENV: "dev",
      MY_ENV: process.env.MY_ENV,
      ebacStoreVersion: "v1"
    }
  },
  // reporter: 'mochawesome',
  // reporterOptions: {
  //   reportFilename: "[name]-result",
  //   html: false
  // }
});
