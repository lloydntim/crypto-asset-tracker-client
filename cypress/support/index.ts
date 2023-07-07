// load type definitions that come with Cypress module
/// <reference types="cypress" />

export {};

/* declare global {
  namespace Cypress {
    interface Chainable {
      login(
        username: string,
        password: string,
      ): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}
 */
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});

/* Cypress.Commands.add(
  'login',
  (username = 'user14', password = 'Password12@') => {
    cy.get('[name=username]').type(username).should('have.value', username);

    cy.get('[name=password]').type(password).should('have.value', password);

    cy.get('button[type=submit]').click().wait(500);
  },
); */
