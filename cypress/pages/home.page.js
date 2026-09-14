class HomePage {
    elements = {
        logoutBtn: () => cy.get('[data-testid="logout"]'),
        welcomeTitle: () => cy.get('.jumbotron h1'),
        leadMessage: () => cy.get('.jumbotron p.lead')
    };

    validateLoginSuccess(userName, texts) {
        cy.url().should('include', '/admin/home');
        this.elements.logoutBtn().should('be.visible');

        this.elements.welcomeTitle()
        .should('be.visible')
        .and('contain.text', texts.welcomeTitle)
        .and('contain.text', userName)
        this.elements.leadMessage().should('have.text', texts.leadMessage);
    }
}

export default new HomePage();