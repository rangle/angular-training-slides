import { browser, element, by } from 'protractor';

export class AveryAppPage {
  navigateTo(url = '/') {
    return browser.get(url);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getAveryRollsHeader() {
    return element(by.css('h1')).getText();
  }

  requestSample() {
    return element(by.css('.btn.btn-primary.top-buffer')).click();
  }

  getModalCloseButton() {
    return element(by.css('.modal__ex-button.ngdialog-close'));
  }

  // getTodos() {
  //   return element(by.css())
  // }
}
