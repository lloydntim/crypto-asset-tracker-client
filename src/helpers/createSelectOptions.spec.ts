import {createSelectOptions} from './createSelectOptions';

jest.mock('i18next', () => ({
  t: (key: string) => key,
}));

describe('createSelectOptions', () => {
  test('should return a list with valid input options', () => {
    const arr = ['rock', 'scissor', 'paper'];

    expect(createSelectOptions(arr, 'path.to.option.typename')).toEqual([
      {value: 'rock', text: 'path.to.option.typename.rock'},
      {value: 'scissor', text: 'path.to.option.typename.scissor'},
      {value: 'paper', text: 'path.to.option.typename.paper'},
    ]);
  });
});
