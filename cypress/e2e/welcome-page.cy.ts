import {ObjectId} from 'mongodb';

// @ts-check
/// <reference types="../support/commands" />

describe('Welcome Page', () => {
  before(() => {
    // delete all coins related to user 02 from database if exists
    cy.deleteMany(
      {creatorId: new ObjectId('649f522c989ff7298b457d04')},
      {collection: 'coin'},
    ).then((result) => {
      cy.log(result); // prints '# documents deleted'
    });
  });

  it('add Bitcoin, Ethereum and Litecoin email', () => {
    const addCoinItem = ({name}: {name: string}) => {
      cy.contains('Edit').click().wait(500);

      cy.get('[name=newCoin]').focus().type(name.substring(0, 3));

      cy.contains(name).click();
      cy.get('[name=newCoin]').should('have.value', name);
      cy.get('.icon-type-plus').click().wait(500);

      cy.contains('Save').click().wait(500);

      cy.contains(name);
    };

    cy.visit('http://localhost:4001/#/login');

    cy.login('user02', 'Password12!');

    cy.contains('Welcome');

    // TODO: create reusable function addCoinListItem

    // cy.contains('Edit').click().wait(500);

    // cy.get('[name=newCoin]').focus().type('Bitc');

    // cy.contains('Bitcoin').click();
    // cy.get('[name=newCoin]').should('have.value', 'Bitcoin');
    // cy.get('.icon-type-plus').click().wait(500);

    // cy.contains('Save').click().wait(500);

    // cy.contains('Bitcoin');

    addCoinItem({name: 'Bitcoin'});
    addCoinItem({name: 'Ethereum'});
    addCoinItem({name: 'Litecoin'});

    /*
    cy.get('[name=newCoin]').type('Eth');
    cy.contains('Ethereum').click();
    cy.get('[name=newCoin]').should('have.value', 'Ethereum');
    cy.get('.input-type-plus').click();
    cy.get('[role=listitem]').contains('Ethereum');

    cy.get('[name=newCoin]').type('Lit');
    cy.contains('Litecoin').click();
    cy.get('[name=newCoin]').should('have.value', 'Litecoin');
    cy.get('.input-type-plus').click();
    cy.get('[role=listitem]').contains('Litecoin'); */
  });

  it('Add holdings', () => {
    // TODO:, make this reusable
    /*  cy.get('[role=listitem]').contains('Bitcoin').click();

    cy.get('[name=name]').type('Coinbase').should('have.value', 'Coinbase');
    cy.get('[name=amount]').type('5').should('have.value', '5');
    cy.get('[name=type]').select('Exchange').should('have.value', 'Exchange');

    cy.get('li .input-type-plus').click();

    cy.get('[name=name]').type('Kraken').should('have.value', 'Kraken');
    cy.get('[name=amount]').type('2').should('have.value', '2');
    cy.get('[name=type]').select('Exchange').should('have.value', 'Exchange');

    cy.get('li .input-type-plus').click();

    cy.contains('Exchange Total: 7'); */
  });
});
