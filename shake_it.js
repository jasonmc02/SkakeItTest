'use strict';

require('./helpers/setup');

var wd = require('wd'),
    _ = require('underscore'),
    Q = require('q'),
    serverConfigs = require('./helpers/appiumserver');

describe('ShakeIt App Automation Test Suit', function () {
  
  this.timeout(300000);
  
  var driver,
      allPassed = true;
  
  before(function () {
    var serverConfig = process.env.SAUCE ? serverConfigs.sauce : serverConfigs.local,
        desired = _.clone(require('./helpers/capabilities').capabilities);
    
    driver = wd.promiseChainRemote(serverConfig);
    require('./helpers/logging').configure(driver);
    // desired.app = require('./helpers/app').shakeItApp;
    
    if (process.env.SAUCE) {
      desired.name = 'Automation Code';
      desired.tags = ['sample'];
    }

    return driver.init(desired);
  });
  
  after(function () {
    return driver
            .sleep(3000)
            .quit()
            .finally(function () {
              if (process.env.SAUCE) {
                return driver.sauceJobStatus(allPassed); 
              }
            }); 
  }); 
  
  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed'; 
  }); 
  
  it('Should Validate Header Text', function () {
    return driver
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.TextView[1]')
            .text()
            .should
            .become('Sacude el telefono dos veces :)');
  });

  it('Should Sum Two Digits', function () {
    return driver
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.EditText[1]')
            .clear()
            .sendKeys('3')
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.EditText[2]')
            .clear()
            .sendKeys('4')
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.Button[1]')
            .click()
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.TextView[2]')
            .text()
            .should
            .become('7');
  });

  it('Should Rest Two Digits', function () {
    return driver
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.EditText[1]')
            .clear()
            .sendKeys('9')
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.EditText[2]')
            .clear()
            .sendKeys('3')
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.Button[2]')
            .click()
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.TextView[2]')
            .text()
            .should
            .become('6');
  });

  it('Should Divide Two Digits', function () {
    return driver
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.EditText[1]')
            .clear()
            .sendKeys('8')
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.EditText[2]')
            .clear()
            .sendKeys('2')
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.Button[3]')
            .click()
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.TextView[2]')
            .text()
            .should
            .become('4');
  });

  it('Should Sum 3 Plus 2', function () {
    return driver
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.EditText[1]')
            .clear()
            .sendKeys('3')
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.EditText[2]')
            .clear()
            .sendKeys('2')
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.Button[2]')
            .click()
            .elementByXPath('//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.RelativeLayout[1]/android.widget.TextView[2]')
            .text()
            .should
            .become('5');
  });
});
