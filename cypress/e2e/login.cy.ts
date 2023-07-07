/// <reference types="cypress" />
// @ts-check
describe('Login Scenario', () => {
  it('login', () => {
    cy.visit('http://localhost:4001/#/login');

    cy.get('[name=username]').type('user14').should('have.value', 'user14');

    cy.get('[name=password]')
      .type('Password12@')
      .should('have.value', 'Password12@');

    cy.get('button[type=submit]').click().wait(500);
    cy.contains('Welcome');
  });
});
