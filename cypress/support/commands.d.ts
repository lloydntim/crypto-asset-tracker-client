/// <reference types="cypress" />

export {};
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      register(
        username: string,
        email: string,
        password: string,
        passwordConfirm: string,
      ): Chainable<void>;
      dataCy(id: string): Chainable<JQuery<HTMLElement>>;
      dataTestId(id: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
