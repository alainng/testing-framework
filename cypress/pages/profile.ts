export class Profile {
    elements = {
        getLatestArticleTitle: () => cy.get('[ng-reflect-router-link^="/article/"]').first().find('h1'),
        getProfileFollowButton: () => cy.get('button i:first'),
        getProfileFollowButtonText: () => cy.get('button i:first').parent()
    }
    
    navigate() {
        cy.visit('/my-profile');
    }

    navigateToOtherProfile(username) {
        cy.visit('/profile/'+username)
    }

    clickFollowButton(){
        this.elements.getProfileFollowButton().click()
    }

}

export const ProfilePage = new Profile();