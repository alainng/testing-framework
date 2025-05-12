export class Editor  {
    elements = {
        titleInput: () =>  cy.get('input[ng-reflect-name="title"]'),
        descriptionInput: () =>  cy.get('input[ng-reflect-name="description"]'),
        bodyInput: () =>  cy.get('textarea[ng-reflect-name="body"]'),
        tagsInput: () =>  cy.get('input[ng-reflect-name="tagInput"]'),
        publishButton: () =>  cy.get('button').contains('Publish Article'),

        getSuccessMessage: () => cy.get('.success-messages') //looking for 'Published successfully!'
    }
    
    navigate() {
        cy.visit('/editor');
    }

    submitNewArticle(title: string,description: string,body: string,tags: string) { //bug for multitags
        this.elements.titleInput().type(title);
        this.elements.descriptionInput().type(description);
        this.elements.bodyInput().type(body);
        //this.elements.tagsInput().type(tags); 
        //this.elements.tagsInput().type("{enter}") //TODO: enter changes the url in tagInput
        this.elements.publishButton().click();
    }
}

export const EditorPage = new Editor();