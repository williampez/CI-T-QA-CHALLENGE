class UserService {
    postUser(payload) {
        return cy.request({
            method: 'POST',
            url: `${Cypress.expose('apiUrl')}/usuarios`, //Cypress.env foi removido na v16, então estou utilizando expose
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