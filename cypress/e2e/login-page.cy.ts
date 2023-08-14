/// <reference types="cypress" />
// @ts-check

describe('Login Scenario', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4001/#/login');
  });
  it('login', () => {
    cy.login('user14', 'Password12@');
    cy.contains('Welcome');
  });

  it('login fails when user does not exist', () => {
    cy.login('userX', 'Password12@');
    cy.contains('User with username userX could not be found.');
  });

  it('login fails when password is wrong', () => {
    cy.login('user14', 'Password@');
    cy.contains('Incorrect password.');
  });
});
