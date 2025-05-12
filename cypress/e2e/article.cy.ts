/// <reference types="cypress" />

import { AuthenticatedHomePage } from '../pages/authenticatedhome';
import { EditorPage } from '../pages/editor'
import { ProfilePage } from '../pages/profile'

describe('practicalTest', () => {
  context('write article', () => {
    beforeEach (() => {
      cy.createAndLoginUser()
      AuthenticatedHomePage.navigate()
    })

    it('logged in user can create articles', () => {
      const random = '1' + Math.random().toString().substring(2,9)
      AuthenticatedHomePage.clickNewArticleLink()
      EditorPage.submitNewArticle("gfdgfdgdfsg"+random,"dfsgsdgdsg","dsfgdsgdsg","fff")
      EditorPage.elements.getSuccessMessage().should('contain','Published successfully!')
    })
    
    it('logged in user newly created article appears on my profile feed', () => {
      const random = '1' + Math.random().toString().substring(2,9)
      AuthenticatedHomePage.clickNewArticleLink()
      EditorPage.submitNewArticle("TESTTHISTITLEPROPERLY"+random,"23424","234234","avavs")
      EditorPage.elements.getSuccessMessage().should('contain','Published successfully!')
      AuthenticatedHomePage.clickMyProfileLink()
      ProfilePage.elements.getLatestArticleTitle().should('have.text','TESTTHISTITLEPROPERLY'+random)
    })
  })
})
