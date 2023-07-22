// @ts-check
/// <reference types="../support/commands" />

describe('Change Email Scenario', () => {
  const email = `${Date.now()}@mail.com`;
  it('change email', () => {
    cy.visit('http://localhost:4001/#/login');

    cy.login('user02', 'Password12!');

    cy.contains('Welcome');

    cy.dataTestId('icon-button-menu').click();

    cy.contains('Profile').click();

    cy.dataTestId('icon-button-edit').click();

    // input clear button
    cy.get('.input-type-email button').click();

    cy.get('[name=email]').type(email).should('have.value', email);

    cy.contains('Update Email').click().wait(500);

    cy.contains(email).should('be.visible');
  });
});
