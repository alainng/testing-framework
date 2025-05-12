export class Article  {
    elements = {
        newCommentInput: () =>  cy.get('textarea'),
        postCommentButton: () =>  cy.get('button').contains('Post Comment'),
        existingCommentText: (commentText: string) =>  cy.get('.card-text').contains(commentText),
        existingCommentDeleteButton: (commentText: string) =>  cy.get('.card-text').contains(commentText).parent().parent().find('.mod-options'),

        topFavoriteButton: () =>  cy.get('.article-meta .counter').first(),
        bottomFavoriteButton: () =>  cy.get('.article-meta .counter').last()
    }
    
    navigate(articleTitle: string) {
        cy.visit('/article/'+articleTitle);
    }

    submitComment(text: string) {
        this.elements.newCommentInput().type(text);
        this.elements.postCommentButton().click();
    }

    deleteComment(text: string) {
        this.elements.existingCommentDeleteButton(text).click();
    }

    clickTopFavoriteButton(){
        this.elements.topFavoriteButton().click()
    }
    clickBottomFavoriteButton(){
        this.elements.bottomFavoriteButton().click()
    }

}

export const ArticlePage = new Article();