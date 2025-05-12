/// <reference types="cypress" />

import { HomePage } from '../pages/home';
import { SignUpPage } from '../pages/signup';
import { LoginPage } from '../pages/login';
import { AuthenticatedHomePage } from '../pages/authenticatedhome';

describe('practicalTest', () => {
  context('login and signup', () => {
    it('signs up a new user successfully', () => {  
      const random = '1' + Math.random().toString().substring(2,9)
      
      HomePage.navigate()
      HomePage.clickSignUpLink()
      SignUpPage.submitNewUser("blabl"+random,random+"fdadg@fdafd.com","gfsdgfhgdfh")

      //verification
      cy.url().should('contain', "/register")
      SignUpPage.elements.getSuccessMessages()
        .should('contain','Registration successful. Redirecting to login page...') //Registration successful. Redirecting to login page...
      
      //after redirection
      cy.get('input[ng-reflect-name="username"]').should('not.exist') //username field is not present after redirection
      cy.url().should('include', "/login") // check if redirected to login page url
    })

    it('signs up and logs in successfully', () => {
      const random = '1' + Math.random().toString().substring(2,9)
      const testerName = "test" + random
      
      HomePage.navigate()
      HomePage.clickSignUpLink()
      SignUpPage.submitNewUser(testerName, testerName+"@gmail.com",testerName)
      LoginPage.navigate()
      LoginPage.submitLogin(testerName +"@gmail.com", testerName)

      AuthenticatedHomePage.elements.getAuthenticatedUserInHeader().should('contain', testerName)
      //improve by checking local storage for presence of auth token
    })

    it('logs in with invalid credentials returns invalid error', () => {
      HomePage.navigate()
      HomePage.clickLoginLink()
      LoginPage.submitLogin("gfdgssfdgdfagfsdg@gfdsgfds.com","Gdfsgfsdgfdsgfsdg")
      cy.url().should('include', "/login") // still on the same page
      LoginPage.elements.getErrorMessages().should('contain','Invalid email or password') // text Invalid email or password
    })

  })
  

})
