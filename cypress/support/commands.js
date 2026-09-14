import loginPage from '../pages/login.page';

Cypress.Commands.add('uiLogin', (email, password) => {
  loginPage.visit();
  loginPage.login(email, password);
});