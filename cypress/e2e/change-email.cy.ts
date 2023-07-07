/// <reference types="cypress" />
// @ts-check

describe('Change Email Scenario', () => {
  it('change email', () => {
    cy.visit('http://localhost:4001/#/register');

    // cy.login('user14', 'password12@');
    cy.dataCy('user14');

    cy.get('button[type=submit]').click().wait(500);
    cy.contains('Welcome');
  });
});
