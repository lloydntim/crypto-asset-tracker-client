/// <reference types="cypress" />
// @ts-check

describe('Login Scenario', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('login', () => {
    cy.login('user14', 'Password12@');
    cy.contains('Welcome');
  });

  it('login fails when user does not exist', () => {
    cy.login('userX', 'Password12@');
    cy.contains('User with username userX could not be found.');
  });

  it('login fails when username too short', () => {
    cy.login('us', 'Password12@');
    cy.contains('text input min length is 5');
  });

  it('login fails when password is wrong', () => {
    cy.login('user14', 'Password1234@');
    cy.contains('Incorrect password.');
  });

  it('login fails when password is too short', () => {
    cy.login('user14', 'Passwo@');
    cy.contains('password input pattern not valid');
  });
});
