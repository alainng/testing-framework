export class Login {
    elements = {
        emailInput: () =>  cy.get('input[ng-reflect-name="email"]'),
        passwordInput: () =>  cy.get('input[ng-reflect-name="password"]'),
        submitSignInButton: () =>  cy.get('button').contains('Sign in'),

        getErrorMessages: () => cy.get('.error-messages')
    }
    
    navigate() {
        cy.visit('/login');
    }

    submitLogin(email,password) {
        this.elements.emailInput().type(email);
        this.elements.passwordInput().type(password);
        this.elements.submitSignInButton().click();
    }
}

export const LoginPage = new Login();