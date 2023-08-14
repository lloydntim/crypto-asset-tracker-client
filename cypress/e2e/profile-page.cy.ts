// @ts-check
/// <reference types="../support/commands" />

const username = 'newuser';

describe('Change Email Scenario', () => {
  before(() => {
    // delete 'registeruser' from database if exists
    cy.deleteOne({username}).then((result) => {
      cy.log(result); // prints the document with the _id if found, otherwise null
    });

    cy.mhDeleteAll();
  });

  const email = `${Date.now()}@mail.com`;

  it('change email', () => {
    cy.visit('/register');

    cy.register(username, 'info@lncd.world', 'Password12!', 'Password12!');

    cy.contains('Welcome');

    cy.dataTestId('icon-button-menu').click();

    cy.contains('Profile').click();

    cy.contains('Pending');

    // verifies email and returns to profile page
    cy.mhGetAllMails()
      .should('have.length', 1)
      .mhFirst()
      .mhGetBody()
      .then((body) => {
        const link = body.match(/(https?):\/\/(www\.)?[a-z0-9\.:].*?(?=\s)/)[0];
        cy.visit(link).wait(500);
      });

    cy.reload();
    cy.contains('Verified');

    cy.dataTestId('icon-button-edit').click();

    // input clear button
    cy.get('.input-type-email button').click();

    cy.get('[name=email]').type(email).should('have.value', email);

    cy.contains('Update Email').click().wait(500);

    cy.contains(email).should('be.visible');
  });

  it('deletes user', () => {
    cy.visit('/login');
    cy.login(username, 'Password12!');

    cy.dataTestId('icon-button-menu').click();

    cy.contains('Profile').click();

    cy.contains('Delete Account').click();
    cy.contains('Continue').click();

    cy.contains('Crypto Asset Checker');
  });

  it('resends verification email', () => {
    cy.mhDeleteAll();

    cy.visit('/register');

    cy.register(username, 'info@lncd.world', 'Password12!', 'Password12!');

    cy.contains('Welcome');

    cy.dataTestId('icon-button-menu').click();

    cy.contains('Profile').click();

    cy.contains('Pending');
    cy.contains('Resend Verification Email').click();

    // confirms that verification email has been resent email and returns to profile page
    cy.mhGetAllMails()
      .should('have.length', 2)
      .mhFirst()
      .mhGetBody()
      .then((body) => {
        const link = body.match(/(https?):\/\/(www\.)?[a-z0-9\.:].*?(?=\s)/)[0];
        cy.visit(link).wait(500);
        cy.reload();
        cy.contains('Verified');
      });
  });

  it('fails when user is already verified', () => {
    cy.mhGetAllMails()
      .mhFirst()
      .mhGetBody()
      .then((body) => {
        const link = body.match(/(https?):\/\/(www\.)?[a-z0-9\.:].*?(?=\s)/)[0];
        cy.visit(link).wait(500);
        cy.contains('User newuser has already been verified.');
      });
  });
});
