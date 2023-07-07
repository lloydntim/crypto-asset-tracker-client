/// <reference types="cypress" />
// @ts-check
describe('Register Scenario', () => {
  const names = [
    'Olivia',
    'Noah',
    'Emma',
    'Liam',
    'Amelia',
    'Oliver',
    'Sophia',
    'Elijah',
    'Ava',
    'Mateo',
    'Isabella',
    'Lucas',
    'Charlotte',
    'Asher',
    'Mia',
    'James',
    'Luna',
    'Leo',
    'Lily',
    'Levi',
    'Harper',
    'Ethan',
    'Evelyn',
    'Ezra',
    'Gianna',
    'Luca',
    'Aurora',
    'Aiden',
    'Ellie',
    'Theo',
    'Sofia',
    'Henry',
    'Violet',
    'Michael',
    'Aria',
    'Sebastian',
    'Mila',
    'Jackson',
    'Willow',
    'Mason',
    'Hazel',
    'Gabriel',
    'Nova',
    'Kai',
    'Layla',
    'Muhammad',
    'Emily',
    'Jack',
    'Ella',
    'Benjamin',
    'Eliana',
    'Grayson',
    'Isla',
    'Hudson',
    'Grace',
    'Elias',
    'Maya',
    'Luke',
    'Chloe',
    'Maverick',
    'Ivy',
    'Alexander',
    'Abigail',
    'Daniel',
    'Elizabeth',
    'Josiah',
    'Nora',
    'William',
    'Scarlett',
    'Logan',
    'Elena',
    'Jayden',
    'Athena',
    'Waylon',
    'Camila',
    'Samuel',
    'Avery',
    'Julian',
    'Penelope',
    'Owen',
    'Naomi',
    'Carter',
    'Zoey',
    'Joseph',
    'Eleanor',
    'Theodore',
    'Kinsley',
    'Caleb',
    'Emilia',
    'Wyatt',
    'Delilah',
    'David',
    'Madison',
    'Eli',
    'Zoe',
    'Isaiah',
    'Iris',
    'Nathan',
    'Victoria',
    'Jacob',
  ];

  it('register', () => {
    const getRandomItemFromArray = (arr) => {
      const randomItemIndex = Math.floor(Math.random() * arr.length);

      return arr[randomItemIndex];
    };

    const getRandomNumber = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);

    const userName = `test_${getRandomItemFromArray(
      names,
    ).toLowerCase()}${getRandomNumber(0, 10000)}`;

    cy.visit('http://localhost:4001/#/register');

    cy.get('[name=username]').type(userName).should('have.value', userName);

    cy.get('[name=email]')
      .type('info@lncd.world')
      .should('have.value', 'info@lncd.world');

    cy.get('[name=password]')
      .type('Password12!')
      .should('have.value', 'Password12!');

    cy.get('[name=passwordConfirm]')
      .type('Password12!')
      .should('have.value', 'Password12!');

    cy.get('button[type=submit]').click().wait(500);
    cy.contains('Welcome');
  });
});
