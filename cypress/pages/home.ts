export class Home {
    elements = {
        signUpLink: () =>  cy.get('a[href="#/register"]'),
        loginLink: () =>  cy.get('a[href="#/login"]')
    }
    
    navigate() {
        cy.visit('/');
    }

    clickSignUpLink()  {
        this.elements.signUpLink().click();
    }

    clickLoginLink() {
        this.elements.loginLink().click();
    }

}

export const HomePage = new Home();