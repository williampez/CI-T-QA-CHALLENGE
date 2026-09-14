class LoginPage {
    // prioriza data-testid nos seletores: mais estavel que classe/texto, nao quebra com mudanca de layout
    elements = {
        emailInput: () => cy.get('[data-testid="email"]'),
        passwordInput: () => cy.get('[data-testid="senha"]'),
        submitBtn: () => cy.get('[data-testid="entrar"]'),
        alertMessage: () => cy.get('.alert')
    }

    visit() {
        cy.visit('/login');
    }

    fillEmail(email) {
        this.elements.emailInput().clear().type(email);
    }
    fillPassword(password) {
        this.elements.passwordInput().clear().type(password);
    }

    submit() {
        this.elements.submitBtn().click();
    }

    login(email, password) {
        this.fillEmail(email);
        this.fillPassword(password);
        this.submit();
    }
}

export default new LoginPage();