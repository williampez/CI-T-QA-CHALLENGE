class HomePage {
    elements = {
        logoutBtn: () => cy.get('[data-testid="logout"]'),
        welcomeTitle: () => cy.get('.jumbotron h1'),
        leadMessage: () => cy.get('.jumbotron p.lead')
    };

    validateLoginSuccess(userName) {
        cy.url().should('include', '/admin/home');
        this.elements.logoutBtn().should('be.visible');

        this.elements.welcomeTitle()
        .should('be.visible')
        .and('contain.text', 'Bem Vindo')
        .and('contain.text', userName)
        this.elements.leadMessage().should('have.text', 'Este é seu sistema para administrar seu ecommerce.');
    }
}

export default new HomePage();