import { capitalizeString } from './'

describe('utils', () => {
  describe('capitalizeString', () => {
    it('should capitalize a string', () => {
      const str = 'capitalized'

      expect(capitalizeString(str)).toEqual('Capitalized')
    })
  })
})
