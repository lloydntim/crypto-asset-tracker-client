/// <reference types="cypress" />
// @ts-check
describe('Register Scenario', () => {
  const username = 'registeruser';

  before(() => {
    // delete 'registeruser' from database if exists
    cy.deleteOne({username}).then((result) => {
      cy.log(result); // prints the document with the _id if found, otherwise null
    });
    cy.mhDeleteAll();
  });

  it('registers a user ', () => {
    cy.register(username, 'info@lncd.world', 'Password12!', 'Password12!');

    cy.contains('Welcome');

    cy.wait(1000);
    cy.mhGetMailsBySubject('Email Verification').should('have.length', 1);
  });

  it('shows error message when user already exists', () => {
    cy.register('user14', 'info@lncd.world', 'Password12!', 'Password12!');

    cy.contains('Token could not be created.');
  });

  it('shows error message when password is invalid', () => {
    cy.register('user14', 'info@lncd.world', 'Password12', 'Password12');

    cy.contains('password input pattern not valid');
  });

  it('shows error message when passwords do not match', () => {
    cy.register('newUser', 'info@lncd.world', 'Password12!', 'Password13!');
    cy.contains('Passwords not matching');
  });
});
