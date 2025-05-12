/// <reference types="cypress" />

import { SignUpPage } from '../pages/signup';
import { LoginPage } from '../pages/login';
import { AuthenticatedHomePage } from '../pages/authenticatedhome';
import { EditorPage } from '../pages/editor'
import { ProfilePage } from '../pages/profile'
import { ArticlePage } from '../pages/article'

describe('practicalTest', () => {
  context('comment feature', () => {
    beforeEach (() => {
      
    })

    xit('added comments are visible', () => {
      const random = '1' + Math.random().toString().substring(2,9)
      
      //Create userA
      SignUpPage.navigate()
      SignUpPage.submitNewUser("userA"+random,"userA"+random+"@gmail.com","userA"+random)
      SignUpPage.elements.getSuccessMessages()
        .should('contain','Registration successful. Redirecting to login page...')
      cy.url().should('include', "/login") // check if redirected to login page url
      
      //Create userB
      SignUpPage.navigate()
      SignUpPage.submitNewUser("userB"+random,"userB"+random+"@gmail.com","userB"+random)
      SignUpPage.elements.getSuccessMessages()
        .should('contain','Registration successful. Redirecting to login page...')
      cy.url().should('include', "/login") // check if redirected to login page url
      
      //userA follow userB
      LoginPage.submitLogin("userA"+random+"@gmail.com","userA"+random)
      AuthenticatedHomePage.elements.getAuthenticatedUserInHeader().should('contain', "userA"+random)
      ProfilePage.navigateToOtherProfile("userB"+random)
      ProfilePage.clickFollowButton()
      ProfilePage.elements.getProfileFollowButtonText().should('include.text', 'Unfollow') //Confirm followed

      //userB create article
      LoginPage.navigate()
      LoginPage.submitLogin("userB"+random+"@gmail.com","userB"+random)
      AuthenticatedHomePage.elements.getAuthenticatedUserInHeader().should('contain', "userB"+random)
      AuthenticatedHomePage.clickNewArticleLink()
      EditorPage.submitNewArticle("followtestarticle"+random,"followtestdescarticle"+random,"followtestbodyarticle","fff")
      EditorPage.elements.getSuccessMessage().should('contain','Published successfully!')

      //userA checks feed to see userB article
      LoginPage.navigate()
      LoginPage.submitLogin("userA"+random+"@gmail.com","userA"+random)
      AuthenticatedHomePage.elements.getAuthenticatedUserInHeader().should('contain', "userA"+random)
      AuthenticatedHomePage.clickMyFeedTab()
      AuthenticatedHomePage.elements.getArticleList().contains("followtestarticle"+random).should('have.text',"followtestarticle"+random)

      //userA adds a comment on userB's article and userA sees their own comment
      AuthenticatedHomePage.elements.getArticleList().contains("followtestarticle"+random).click()
      ArticlePage.submitComment("TESTCOMMENT"+random)
      ArticlePage.elements.existingCommentText("TESTCOMMENT"+random).should('be.visible')

      //check if userB sees the same comment on the article to confirm
      LoginPage.navigate()
      LoginPage.submitLogin("userB"+random+"@gmail.com","userB"+random)
      AuthenticatedHomePage.elements.getAuthenticatedUserInHeader().should('contain', "userB"+random)
      ArticlePage.navigate("followtestarticle"+random)
      ArticlePage.elements.existingCommentText("TESTCOMMENT"+random).should('be.visible')
    })

    it('removed comments disappear', () => {
      const random = '1' + Math.random().toString().substring(2,9)
      
      //Create userA
      SignUpPage.navigate()
      SignUpPage.submitNewUser("userA"+random,"userA"+random+"@gmail.com","userA"+random)
      SignUpPage.elements.getSuccessMessages()
        .should('contain','Registration successful. Redirecting to login page...')
      cy.url().should('include', "/login") // check if redirected to login page url
      
      //Create userB
      SignUpPage.navigate()
      SignUpPage.submitNewUser("userB"+random,"userB"+random+"@gmail.com","userB"+random)
      SignUpPage.elements.getSuccessMessages()
        .should('contain','Registration successful. Redirecting to login page...')
      cy.url().should('include', "/login") // check if redirected to login page url
      
      //userA follow userB
      LoginPage.submitLogin("userA"+random+"@gmail.com","userA"+random)
      AuthenticatedHomePage.elements.getAuthenticatedUserInHeader().should('contain', "userA"+random)
      ProfilePage.navigateToOtherProfile("userB"+random)
      ProfilePage.clickFollowButton()
      ProfilePage.elements.getProfileFollowButtonText().should('include.text', 'Unfollow') //Confirm followed

      //userB create article
      LoginPage.navigate()
      LoginPage.submitLogin("userB"+random+"@gmail.com","userB"+random)
      AuthenticatedHomePage.elements.getAuthenticatedUserInHeader().should('contain', "userB"+random)
      AuthenticatedHomePage.clickNewArticleLink()
      EditorPage.submitNewArticle("followtestarticle"+random,"followtestdescarticle"+random,"followtestbodyarticle","fff")
      EditorPage.elements.getSuccessMessage().should('contain','Published successfully!')

      //userA checks feed to see userB article
      LoginPage.navigate()
      LoginPage.submitLogin("userA"+random+"@gmail.com","userA"+random)
      AuthenticatedHomePage.elements.getAuthenticatedUserInHeader().should('contain', "userA"+random)
      AuthenticatedHomePage.clickMyFeedTab()
      AuthenticatedHomePage.elements.getArticleList().contains("followtestarticle"+random).should('have.text',"followtestarticle"+random)

      //userA adds a comment on userB's article and userA sees their own comment
      AuthenticatedHomePage.elements.getArticleList().contains("followtestarticle"+random).click()
      ArticlePage.submitComment("TESTCOMMENT"+random)
      ArticlePage.elements.existingCommentText("TESTCOMMENT"+random).should('be.visible')

      //userA delete comment 
      ArticlePage.elements.existingCommentText("TESTCOMMENT"+random).scrollIntoView()
      ArticlePage.deleteComment("TESTCOMMENT"+random)
      cy.contains("TESTCOMMENT"+random).should('not.exist')

      //check if userB confirms unable to see the deleted comment
      LoginPage.navigate()
      LoginPage.submitLogin("userB"+random+"@gmail.com","userB"+random)
      AuthenticatedHomePage.elements.getAuthenticatedUserInHeader().should('contain', "userB"+random)
      ArticlePage.navigate("followtestarticle"+random)
      cy.contains("TESTCOMMENT"+random).should('not.exist')
    })
  })
})
