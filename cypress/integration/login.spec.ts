/// <reference types="cypress" />
// @ts-check

it('login', () => {
    cy.visit('http://localhost:3001');

    cy.get('[name=username]')
        .type('admin')
        .should('have.value', 'admin');

    cy.get('[name=password]')
        .type('admin')
        .should('have.value', 'admin');

    cy.get('button[type=submit]')
        .click()
        .wait(500);
    cy.contains('Welcome');
});
