/// <reference types="cypress" />

import { SignUpPage } from '../pages/signup';
import { LoginPage } from '../pages/login';
import { AuthenticatedHomePage } from '../pages/authenticatedhome';
import { EditorPage } from '../pages/editor'
import { ProfilePage } from '../pages/profile'
import { ArticlePage } from '../pages/article'

describe('practicalTest', () => {
  context('favorite feature', () => {

    it('article favorite button increases and decreases by 1', () => {
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

      //Article page top favorite counter increase and decrease
      AuthenticatedHomePage.elements.getArticleList().contains("followtestarticle"+random).click()
      ArticlePage.elements.topFavoriteButton().should('have.text','(0)') 
      ArticlePage.clickTopFavoriteButton()
      ArticlePage.elements.topFavoriteButton().should('have.text','(1)')
      ArticlePage.clickTopFavoriteButton()
      ArticlePage.elements.topFavoriteButton().should('have.text','(0)')

      //Article page bottom favorite counter increase and decrease
      ArticlePage.elements.bottomFavoriteButton().should('have.text','(0)') 
      ArticlePage.clickBottomFavoriteButton()
      ArticlePage.elements.bottomFavoriteButton().should('have.text','(1)')
      ArticlePage.clickBottomFavoriteButton()
      ArticlePage.elements.bottomFavoriteButton().should('have.text','(0)')

      //Feed favorite counter increase
      AuthenticatedHomePage.navigate()
      AuthenticatedHomePage.clickMyFeedTab()
      AuthenticatedHomePage.clickFavoriteButton("followtestarticle"+random)
      AuthenticatedHomePage.elements.getSpecificArticleFavoriteButton("followtestarticle"+random).should('include.text','1') 
      AuthenticatedHomePage.clickFavoriteButton("followtestarticle"+random)
      AuthenticatedHomePage.elements.getSpecificArticleFavoriteButton("followtestarticle"+random).should('include.text','0') 
    })

    it('my feed favorites increase and decrease by 1', () => {
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

      //Feed favorite counter increase
      LoginPage.navigate()
      LoginPage.submitLogin("userA"+random+"@gmail.com","userA"+random)
      AuthenticatedHomePage.elements.getAuthenticatedUserInHeader().should('contain', "userA"+random)
      AuthenticatedHomePage.clickMyFeedTab()
      AuthenticatedHomePage.clickFavoriteButton("followtestarticle"+random)
      AuthenticatedHomePage.elements.getSpecificArticleFavoriteButton("followtestarticle"+random).should('include.text','1') 
      AuthenticatedHomePage.clickFavoriteButton("followtestarticle"+random)
      AuthenticatedHomePage.elements.getSpecificArticleFavoriteButton("followtestarticle"+random).should('include.text','0') 
    })
  })
})
