class AuthService {
    login(email, password) {
        return cy.request({
            method: 'POST',
            url: `${Cypress.expose('apiUrl')}/login`,
            body: { email, password },
            failOnStatusCode: false
        })
    }
}

export default new AuthService();
