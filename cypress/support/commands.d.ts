/// <reference types="cypress" />

export {};
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      dataCy(id: string): Chainable<JQuery<HTMLElement>>;
      dataTestId(id: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
