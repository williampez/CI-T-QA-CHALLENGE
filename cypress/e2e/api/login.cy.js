import authService from '../../services/auth.service';
import userService from '../../services/users.service';
import { UserFactory } from '../../support/factories/user.factory';

describe('API - Login Endpoint', () => {
    let validUser;
    let messages;

    before(() => {
        // Fixtures centralizam os dados esperados, evitando strings hardcoded
        // espalhadas pelos testes e facilitando a manutencao.
        cy.fixture('messages').then((data) => {
            messages = data;
        });
    })

    beforeEach(() => {
        // Setup via API: cria um usuario real para autenticar de forma
        // deterministica, seguindo o mesmo padrao dos demais testes.
        validUser = UserFactory.buildUser();
        userService.postUser(validUser);
    })

    it('1. Should authenticate successfully with valid credentials (Happy path)', () => {
        authService.login(validUser.email, validUser.password).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq(messages.api.login.success);
            expect(response.body).to.have.property('authorization');
            expect(response.body.authorization).to.include('Bearer');
            expect(response.duration).to.be.lessThan(2000);
        })
    })

    it('2. Should reject authentication with an incorrect password (Negative path)', () => {
        authService.login(validUser.email, 'wrong_password_2026').then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq(messages.api.login.invalidCredentials);
            expect(response.body).to.not.have.property('authorization');
        })
    })

    it('3. Should reject authentication with an unregistered email (Business Rule)', () => {
        const unregisteredEmail = UserFactory.buildInvalidEmail();
        authService.login(unregisteredEmail, validUser.password).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq(messages.api.login.invalidCredentials);
            expect(response.body).to.not.have.property('authorization');
        })
    })
})
