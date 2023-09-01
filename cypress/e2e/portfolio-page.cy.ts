// @ts-check
/// <reference types="../support/commands" />

import {ObjectId} from 'mongodb';

const addCoin = (name: string, manual: boolean) => {
  cy.wait(750);
  // Enter coin name
  cy.get('input[name=newCoin]').type(manual ? name : name.substring(0, 3), {
    delay: 100,
  });
  // cy.get('input[name=newCoin]').type(name, {delay: 50});

  if (!manual) {
    // Click on dropdown
    cy.contains(name).click();

    cy.get('[name=newCoin]').should('have.value', name);
  }

  // Click on add button
  cy.get('.icon-type-plus:first').click();
};

const addHoldings = (
  parent: string,
  holdings: {type: string; amount: number; name: string}[],
) => {
  cy.wait(750);
  cy.get('[role=listitem]').contains(parent).click({force: true});

  holdings.forEach(({name, amount, type}) => {
    cy.wait(750);
    cy.get('[name=name]').type(name, {delay: 100}).should('have.value', name);
    cy.get('[name=amount]')
      .type(amount.toString(), {force: true, delay: 100})
      .should('have.value', amount);

    cy.get('[role=listitem] .select-value').click({force: true});
    cy.get('.select-options-group').contains(type).click({force: true});
    cy.get('[role=listitem] .icon-type-plus').click({force: true});
  });
};

const coin = {
  parent: null,

  add(name: string, manual = false) {
    this.parent = name;
    addCoin(name, manual);

    return this;
  },
  addHoldings(holdings) {
    addHoldings(this.parent, holdings);
    return this;
  },
};

describe('Portfolio Page', () => {
  beforeEach(() => {
    // delete all coins related to user 02 from database if exists
    cy.deleteMany(
      {creatorId: new ObjectId('649f522c989ff7298b457d04')},
      {collection: 'coin'},
    ).then((result) => {
      cy.log(result); // prints '# documents deleted'
    });

    cy.visit('/login');

    cy.login('user02', 'Password12!');

    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  });

  it('add using presets Coins and holdings', () => {
    cy.contains('Edit').click().wait(500);

    coin.add('Bitcoin').addHoldings([
      {name: 'Coinbase', type: 'Exchange', amount: 10},
      {name: 'Kraken', type: 'Exchange', amount: 5},
      {name: 'Binance', type: 'Exchange', amount: 2.5},
      {name: 'Ledger', type: 'Wallet', amount: 2.5},
      {name: 'Trezor', type: 'Wallet', amount: 2.5},
    ]);

    cy.contains('Exchange Total Value: 17.5');
    cy.contains('Wallet Total Value: 5');

    coin.add('Ethereum').addHoldings([
      {name: 'Trezor', type: 'Wallet', amount: 3},
      {name: 'Ledger', type: 'Wallet', amount: 2},
      {name: 'Pool', type: 'Staking', amount: 0.75},
      {name: 'Binance', type: 'Staking', amount: 0.25},
      {name: 'Binance', type: 'Exchange', amount: 1.5},
      {name: 'Kraken', type: 'Exchange', amount: 1.5},
    ]);

    cy.contains('Bitcoin');
    cy.contains('Ethereum');
    cy.contains('Wallet Total Value: 5');
    cy.contains('Exchange Total Value: 3');
    cy.contains('Staking Total Value: 1');
  });

  it('add Coins and holdings using manual entry', () => {
    cy.contains('Edit').click().wait(500);

    cy.contains('Preset').click();
    cy.contains('Other').click();

    coin.add('ThetaDrop', true).addHoldings([
      {name: 'Ledger', type: 'Wallet', amount: 2},
      {name: 'Pool', type: 'Staking', amount: 0.75},
      {name: 'Binance', type: 'Staking', amount: 0.25},
    ]);

    cy.contains('Wallet Total Value: 2');
    cy.contains('Staking Total Value: 1');
  });

  it('adding Coin using manual entry fails', () => {
    cy.contains('Edit').click().wait(500);

    cy.contains('Preset').click();
    cy.contains('Other').click();

    coin.add('DoesNotExistCoin', true);

    cy.contains('Coin could not be added.');
  });

  it('update and delete Coin holdings', () => {
    cy.contains('Edit').click().wait(500);

    coin
      .add('Bitcoin')
      .addHoldings([
        {name: 'Trezor', type: 'Wallet', amount: 3},
        {name: 'Kraken', type: 'Exchange', amount: 1.5},
      ])
      .add('Ethereum')
      .addHoldings([
        {name: 'Pool', type: 'Staking', amount: 0.75},
        {name: 'Binance', type: 'Staking', amount: 0.25},
      ]);

    cy.contains('Bitcoin').click();

    cy.get('.icon-type-edit:first').click();
    cy.get('input[name=fieldName]:first').clear().type('Ledger').blur();

    cy.get('.icon-type-edit').eq(1).click();
    cy.get('input[name=fieldName]:first')
      .clear()
      .type('4', {delay: 1000})
      .blur()
      .wait(500);

    cy.contains('Wallet Total Value: 4');
    cy.contains('Ledger');
    cy.contains('Trezor').should('not.exist');

    cy.contains('Ethereum').click();

    cy.get('.holding:first .icon-type-delete').eq(1).click();
    cy.contains('Continue').click().wait(500);

    cy.contains('Staking Total Value: 0.75');
    cy.contains('Binance').should('not.exist');
  });

  it('delete Coins', () => {
    cy.contains('Edit').click().wait(500);

    coin.add('Bitcoin');

    cy.get('li .icon-type-delete:first').click();

    // Dialog appears
    cy.contains('Remove Coin');

    // Clicks continue button to proceed
    cy.contains('Continue').click().wait(500);
    cy.contains('Bitcoin').should('not.exist');
  });

  it('change currency', () => {
    cy.contains('USD').click();
    cy.contains('EUR').click();

    cy.contains('EUR');
    cy.contains('USD').should('not.exist');
    cy.contains('Total: 0,00 €');

    cy.contains('EUR').click();
    cy.contains('GBP').click();

    cy.contains('GBP');
    cy.contains('EUR').should('not.exist');
    cy.contains('Total: £0.00');

    cy.contains('GBP').click();
    cy.contains('USD').click();

    cy.contains('USD');
    cy.contains('GBP').should('not.exist');
    cy.contains('Total: $0.00');
  });

  it('go to different pages and change language', () => {
    cy.contains('Welcome');
    cy.get('.icon-type-menu').click();

    cy.contains('Profile').click();
    cy.contains('User account details');

    cy.go('back');

    cy.get('.icon-type-menu').click();

    cy.contains('About').click();
    cy.contains('About This App');

    cy.go('back');

    cy.get('.icon-type-menu').click();
    cy.contains('German').click();
    cy.get('.icon-type-close').click();

    cy.contains('Willkommen');
  });
});
