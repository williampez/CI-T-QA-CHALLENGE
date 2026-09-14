import loginPage from '../../pages/login.page';
import homePage from '../../pages/home.page';
import usersService from '../../services/users.service';
import { UserFactory } from '../../support/factories/user.factory';

describe('E2E - Authenticate', () => {
    let userMassa;
    let messages;

    before(() => {
        // Fixtures centralizam os dados esperados, evitando strings hardcoded
        // espalhadas pelos testes e facilitando a manutencao.
        cy.fixture('messages').then((data) => {
            messages = data;
        });
    })

    beforeEach(() => {
        userMassa = UserFactory.buildUser();

        usersService.postUser(userMassa);
    })

    it('1. Should authenticate successfully using valid credentials (Happy path)', () => {
        cy.uiLogin(userMassa.email, userMassa.password)
        // O Page Object recebe os textos esperados por parametro: quem conhece
        // os dados de teste e o spec, nao a pagina (separacao de responsabilidades).
        homePage.validateLoginSuccess(userMassa.nome, messages.gui.home);
    })

    it('2. Should display an error alert when submitting an incorrect password (negative path)', () => {
        cy.uiLogin(userMassa.email, 'SenhaInvalida@2026');
        loginPage.elements.alertMessage()
        .should('be.visible')
        .and('contain.text', messages.gui.login.invalidCredentials);
    })

    it('3. Should display an error alert when attempting to authenticate with an unregistered email (Business Rule)', () => {
        const emailInexistente = UserFactory.buildInvalidEmail();
        cy.uiLogin(emailInexistente, userMassa.password);
        loginPage.elements.alertMessage()
        .should('be.visible')
        .and('contain.text', messages.gui.login.invalidCredentials)
    })
})
