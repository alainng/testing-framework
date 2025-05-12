export class SignUp {
    elements = {
        usernameInput: () =>  cy.get('input[ng-reflect-name="username"]'), 
        emailInput: () =>  cy.get('input[ng-reflect-name="email"]'), 
        passwordInput: () =>  cy.get('input[ng-reflect-name="password"]'), 
        submitSignInButton: () =>  cy.get('button').contains('Sign up'),

        getSuccessMessages: () => cy.get('.success-messages'), //looking for "Registration successful. Redirecting to login page..."
        getErrorMessages: () => cy.get('.error-messages') //Email: A user with that email already exists 
                                                            //Username: A user with that username already exists.
    }

    navigate() {
        cy.visit('/register');
    }

    submitNewUser(username,email,password) {
        this.elements.usernameInput().type(username);
        this.elements.emailInput().type(email);
        this.elements.passwordInput().type(password);
        this.elements.submitSignInButton().click();
    }
}

export const SignUpPage = new SignUp();