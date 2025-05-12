// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login')
    cy.get('input[ng-reflect-name="email"]').type(email)
    cy.get('input[ng-reflect-name="password"]').type(password)
    cy.get('button').contains('Sign in').click()
})

Cypress.Commands.add('createUser', (username, email, password) => {
    cy.visit('/register')
    cy.get('input[ng-reflect-name="username"]').type(username)
    cy.get('input[ng-reflect-name="email"]').type(email)
    cy.get('input[ng-reflect-name="password"]').type(password)
    cy.get('button').contains('Sign up').click()
})

Cypress.Commands.add('createAndLoginUser', () =>{
    const random = '1' + Math.random().toString().substring(2,9)
    const testerName = "test" + random
    
    cy.createUser(testerName, testerName+"@gmail.com",testerName)
    cy.login(testerName +"@gmail.com", testerName)
    cy.get('a[ng-reflect-router-link="/my-profile"]').should('contain', testerName)
})