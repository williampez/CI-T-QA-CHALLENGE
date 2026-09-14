import loginPage from '../../pages/login.page';
import homePage from '../../pages/home.page';
import usersService from '../../services/users.service';
import { UserFactory } from '../../support/factories/user.factory';

describe('E2E - Authenticate', () => {
    let userMassa;

    beforeEach(() => {
        userMassa = UserFactory.buildUser();

        usersService.postUser(userMassa);
    })

    it('1. Should authenticate successfully using valid credentials (Happy path)', () => {
        cy.uiLogin(userMassa.email, userMassa.password)
        homePage.validateLoginSuccess(userMassa.nome);
    })

    it('2. Should display an error alert when submitting an incorrect password (negative path)', () => {
        cy.uiLogin(userMassa.email, 'SenhaInvalida@2026');
        loginPage.elements.alertMessage()
        .should('be.visible')
        .and('contain.text', 'Email e/ou senha inválidos');
    })

    it('3. Should display an error alert when attempting to authenticate with an unregistered email (Business Rule)', () => {
        const emailInexistente = UserFactory.buildInvalidEmail();
        cy.uiLogin(emailInexistente, userMassa.password);
        loginPage.elements.alertMessage()
        .should('be.visible')
        .and('contain.text', 'Email e/ou senha inválidos')
    })
})
