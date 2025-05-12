
export class AuthenticatedHome {
    elements = {
        newArticleLink: () =>  cy.get('a[ng-reflect-router-link="/editor"]'),
        myProfileLink: () =>  cy.get('a[ng-reflect-router-link="/my-profile"]'),
        myFeedTab: () => cy.get('a').contains('My Feed'),

        getAuthenticatedUserInHeader: () => cy.get('a[ng-reflect-router-link="/my-profile"]'),
        getArticleList: () =>  cy.get('[ng-reflect-router-link^="/article/"]'),
        getSpecificArticleFavoriteButton: (articleTitle: string) => cy.get('[ng-reflect-router-link^="/article/"]').contains(articleTitle).parent().parent().find('.article-meta button')
    }

    navigate() {
        cy.visit('/');
    }

    clickNewArticleLink() {
        this.elements.newArticleLink().click();
    }

    clickMyProfileLink() {
        this.elements.myProfileLink().click();
    }

    clickMyFeedTab(){
        this.elements.myFeedTab().click()
    }

    clickFavoriteButton(text: string){
        this.elements.getSpecificArticleFavoriteButton(text).click()
    }


}

export const AuthenticatedHomePage = new AuthenticatedHome();