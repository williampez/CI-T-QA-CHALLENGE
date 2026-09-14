class UserService {
    postUser(payload) {
        return cy.request({
            method: 'POST',
            url: `${Cypress.expose('apiUrl')}/usuarios`, //removido no cypress 16 e depresseado no 15
            body: payload,
            failOnStatusCode: false
        })
    }

    getUsers() {
        return cy.request({
            method: 'GET',
            url: `${Cypress.expose('apiUrl')}/usuarios`,
            failOnStatusCode: false
        })
    }
}

export default new UserService();