import {addCommands} from 'cypress-mongodb';

import 'cypress-mailhog';

addCommands();

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// -- This is a parent command --
Cypress.Commands.add('dataCy', (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('dataTestId', (value: string) => {
  return cy.get(`[data-testid=${value}]`);
});

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('[name=username]').type(username).should('have.value', username);

  cy.get('[name=password]').type(password).should('have.value', password);

  cy.get('button[type=submit]').click().wait(500);
});

Cypress.Commands.add(
  'register',
  (
    username: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) => {
    cy.visit('http://localhost:4001/#/register');

    cy.get('[name=username]').type(username).should('have.value', username);

    cy.get('[name=email]').type(email).should('have.value', email);

    cy.get('[name=password]').type(password).should('have.value', password);

    cy.get('[name=passwordConfirm]')
      .type(passwordConfirm)
      .should('have.value', passwordConfirm);

    cy.get('button[type=submit]').click({force: true}).wait(500);
  },
);

// overrides Mailhog based request that deletes all emails, to ignore Mailhog related server error
Cypress.Commands.overwrite('mhDeleteAll', () => {
  return cy.request({
    method: 'DELETE',
    url: 'http://localhost:8025/api/v1/messages',
    failOnStatusCode: false,
  });
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
