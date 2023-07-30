// @ts-check
/// <reference types="../support/commands" />

import {ObjectId} from 'mongodb';

const addCoin = (name: string, manual: boolean) => {
  // Enter coin name
  cy.get('input[name=newCoin]').type(manual ? name : name.substring(0, 3));

  if (!manual) {
    // Click on dropdown
    cy.contains(name).click();

    cy.get('[name=newCoin]').should('have.value', name);
  }

  // Click on add button
  cy.get('.icon-type-plus:first').click().wait(500);
};

const addHoldings = (
  parent: string,
  holdings: {type: string; amount: number; name: string}[],
) => {
  //
  cy.get('[role=listitem]').contains(parent).click();

  holdings.forEach(({name, amount, type}) => {
    cy.get('[name=name]').type(name).should('have.value', name);
    cy.get('[name=amount]')
      .type(amount.toString())
      .should('have.value', amount);

    cy.get('[role=listitem] .select-value').click();
    cy.get('.select-options-group').contains(type).click();
    cy.get('[role=listitem] .icon-type-plus').click();
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

describe('Welcome Page', () => {
  beforeEach(() => {
    // delete all coins related to user 02 from database if exists
    cy.deleteMany(
      {creatorId: new ObjectId('649f522c989ff7298b457d04')},
      {collection: 'coin'},
    ).then((result) => {
      cy.log(result); // prints '# documents deleted'
    });

    cy.visit('http://localhost:4001/#/login');

    cy.login('user02', 'Password12!');
  });

  it('add using presets Coins and holdings', () => {
    cy.contains('Edit').click().wait(1000);

    coin.add('Bitcoin').addHoldings([
      {name: 'Coinbase', type: 'Exchange', amount: 10},
      {name: 'Kraken', type: 'Exchange', amount: 5},
      {name: 'Binance', type: 'Exchange', amount: 2.5},
      {name: 'Ledger', type: 'Wallet', amount: 2.5},
      {name: 'Trezor', type: 'Wallet', amount: 2.5},
    ]);

    cy.contains('Exchange Total: 17.5');
    cy.contains('Wallet Total: 5');

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
    cy.contains('Wallet Total: 5');
    cy.contains('Exchange Total: 3');
    cy.contains('Staking Total: 1');
  });

  it('add Coins and holdings using manual entry', () => {
    cy.contains('Edit').click().wait(1000);

    cy.contains('Preset').click();
    cy.contains('Other').click();

    coin.add('ThetaDrop', true).addHoldings([
      {name: 'Ledger', type: 'Wallet', amount: 2},
      {name: 'Pool', type: 'Staking', amount: 0.75},
      {name: 'Binance', type: 'Staking', amount: 0.25},
    ]);

    cy.contains('Wallet Total: 2');
    cy.contains('Staking Total: 1');
  });

  it('adding Coin using manual entry fails', () => {
    cy.contains('Edit').click().wait(1000);

    cy.contains('Preset').click();
    cy.contains('Other').click();

    coin.add('DoesNotExistCoin', true);

    cy.contains('Coin could not be added.');
  });

  it('update and delete Coin holdings', () => {
    cy.contains('Edit').click().wait(1000);

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
    cy.get('input[name=fieldName]:first').clear().type('4').blur();

    cy.contains('Wallet Total: 4');
    cy.contains('Ledger');
    cy.contains('Trezor').should('not.exist');

    cy.contains('Ethereum').click();

    cy.get('.holding:first .icon-type-delete').eq(1).click();
    cy.contains('Continue').click().wait(500);

    cy.contains('Staking Total: 0.25');
    cy.contains('Pool').should('not.exist');
  });

  it('delete Coins', () => {
    cy.contains('Edit').click().wait(1000);

    coin
      .add('Bitcoin')
      .add('Ethereum')
      .addHoldings([
        {name: 'Binance', type: 'Staking', amount: 0.25},
        {name: 'Binance', type: 'Exchange', amount: 1.5},
      ]);

    cy.get('li .icon-type-delete:first').click();

    // Dialog appears
    cy.contains('Remove Coin');

    // Clicks continue button to proceed
    cy.contains('Continue').click().wait(500);

    cy.contains('Bitcoin').should('not.exist');
    cy.contains('Ethereum');
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
