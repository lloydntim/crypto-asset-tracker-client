// @ts-check
/// <reference types="../support/commands" />

describe('Reset Password Scenario', () => {
  const username = 'userrp';

  before(() => {
    // delete 'registeruser' from database if exists
    cy.deleteOne({username}).then((result) => {
      cy.log(result); // prints the document with the _id if found, otherwise null
    });

    cy.mhDeleteAll();
  });

  it('goes to reset page', () => {
    cy.visit('/register');
    cy.register(username, 'info@lncd.world', 'Password12!', 'Password12!');

    cy.visit('/forgot');
    cy.contains('Forgot');

    cy.get('[name=username]').type(username).should('have.value', username);
    cy.contains('Submit').click().wait(500);

    // verifies email and returns to profile page
    cy.mhGetAllMails()
      .should('have.length', 2)
      .mhGetMailsBySubject('Password Reset.')
      .mhFirst()
      .mhGetBody()
      .then((body) => {
        const link = body.match(/(https?):\/\/(www\.)?[a-z0-9\.:].*?(?=\s)/)[0];
        cy.log(link);
        cy.log(body);
        cy.visit(link).wait(500);
      });

    // enter new password
    cy.get('[name=password]')
      .type('Password12@')
      .should('have.value', 'Password12@');

    cy.get('[name=passwordConfirm]')
      .type('Password12@')
      .should('have.value', 'Password12@');
    cy.get('button[type=submit]').click().wait(500);

    cy.contains('Welcome');

    cy.get('.icon-type-menu').click();
    cy.contains('Logout').click();
    cy.contains('Continue').click();

    cy.contains('Login').click();
    cy.login(username, 'Password12@');

    cy.contains('Welcome');
  });
});
