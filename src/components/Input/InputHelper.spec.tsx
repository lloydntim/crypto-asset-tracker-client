import { InputProps, InputChangeEventTarget, validateInput } from "./InputHelper";

const inputValidationDefaultProps: InputProps = {
  type: 'text',
  pattern: null,
  required: false,
  minLength: null,
  maxLength: null,
  patternErrorMessage: '',
  requiredErrorMessage: '',
  minLengthErrorMessage: '',
  maxLengthErrorMessage: '',
};

const inputDefaultEventTarget: InputChangeEventTarget = { value: '', files: null };

describe('validateInput', () => {
  describe('if not required', () => {
    it('should not return error message when value is empty', () => {
      const errorMessage = validateInput(inputDefaultEventTarget, inputValidationDefaultProps);

      expect(errorMessage).toBeFalsy();
    });

    it('should not return error message when file is empty', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, type: 'file', };
      const errorMessage = validateInput(inputDefaultEventTarget, inputValidationProps);

      expect(errorMessage).toBeFalsy();
    });
  });

  describe('if required', () => {
    it('should return error message when value is empty', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, required: true };
      const errorMessage = validateInput(inputDefaultEventTarget, inputValidationProps);

      expect(errorMessage).toBe('text input is required');
    });

    it('should return custom error message when value is empty', () => {
      const inputValidationProps = {
        ...inputValidationDefaultProps,
        required: true,
        requiredErrorMessage: 'please enter text',
      };

      const errorMessage = validateInput(inputDefaultEventTarget, inputValidationProps);
      expect(errorMessage).toBe('please enter text');
    });

    it('should return custom error message when file is empty', () => {
      const inputValidationProps = {
        ...inputValidationDefaultProps,
        type: 'file',
        required: true,
        requiredErrorMessage: 'please add a file',
      };

      const errorMessage = validateInput(inputDefaultEventTarget, inputValidationProps);
      expect(errorMessage).toBe('please add a file');
    });

    it('should not return error message when value is set', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, required: true };
      const inputEventTarget = { value: 'This is some text' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBeFalsy();
    });

    it('should not return error message when file is added', () => {
      const mockFile = { name: 'file.txt' };
      const inputValidationProps = { ...inputValidationDefaultProps, type: 'file', required: true, };
      const inputEventTarget = { files: [mockFile] };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBeFalsy();
    });
  });

  describe('if pattern valid', () => {
    it('should not return error message for value pattern', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, pattern: /[a-z]+/ };
      const inputEventTarget = { value: 'all lowercase' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBeFalsy();
    });

    it('should not return error message for email pattern', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, type: 'email' };
      const inputEventTarget = { value: 'user@mockmail.com' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBeFalsy();
    });

    it('should not return error message for file pattern', () => {
      const mockFile = { name: 'image.jpg' };
      const inputValidationProps = { ...inputValidationDefaultProps, type: 'file', pattern: /[a-z]+.(?:jpg|png)/, };
      const inputEventTarget = { files: [mockFile] };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBeFalsy();
    });
  });

  describe('if pattern invalid', () => {
    it('should return error message for value pattern', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, pattern: /[a-z]+/ };
      const inputEventTarget = { value: 'NO LOWERCASE' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('text input pattern not valid');
    });

    it('should return error message for file pattern', () => {
      const mockFile = { name: 'image.svg' };
      const inputValidationProps = { ...inputValidationDefaultProps, type: 'file', pattern: /[a-z]+.(?:jpg|png)/ };
      const inputEventTarget = { files: [mockFile] };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('file input pattern not valid');
    });

    it('should return error message for email pattern', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, type: 'email' };
      const inputEventTarget = { value: 'usermockmail.com' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('email input pattern not valid');
    });

    it('should return custom error message for value pattern', () => {
      const inputValidationProps = {
        ...inputValidationDefaultProps,
        pattern: /[a-z]+/,
        patternErrorMessage: 'invalid text',
      };
      const inputEventTarget = { value: 'NO LOWERCASE' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('invalid text');
    });

    it('should return error message for email pattern', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, type: 'email', patternErrorMessage: 'invalid email' };
      const inputEventTarget = { value: 'usermockmail.com' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('invalid email');
    });

    it('should return custom error message for file pattern', () => {
      const mockFile = { name: 'image.svg' };
      const inputValidationProps = {
        ...inputValidationDefaultProps,
        type: 'file',
        pattern: /[a-z]+.(?:jpg|png)/,
        patternErrorMessage: 'invalid file'
      };
      const inputEventTarget = { files: [mockFile] };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('invalid file');
    });
  });

  describe('if minimum length', () => {
    it('should not return error message for value length', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, minLength: 10 };
      const inputEventTarget = { value: 'This text is short enough' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBeFalsy();
    });
  });

  describe('if below minimum length', () => {
    it('should return error message for value length', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, minLength: 40 };
      const inputEventTarget = { value: 'This text is too short' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('text input min length is 40');
    });

    it('should return custom error message for value length', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, minLength: 40, minLengthErrorMessage: 'the text is too short' };
      const inputEventTarget = { value: 'This text is too short' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('the text is too short');
    });
  });

  describe('if maximum length', () => {
    it('should not return error message for value length', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, maxLength: 40 };
      const inputEventTarget = { value: 'This text is short enough' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBeFalsy();
    });
  });

  describe('if over maximum length', () => {
    it('should return error message for value length', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, maxLength: 10 };
      const inputEventTarget = { value: 'This text is long' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('text input max length is 10');
    });

    it('should return custom error message for value length', () => {
      const inputValidationProps = { ...inputValidationDefaultProps, maxLength: 10, maxLengthErrorMessage: 'the text is too short' };
      const inputEventTarget = { value: 'This text is long' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('the text is too short');
    });
  });

  describe('if several requirements are met', () => {
    it('should return no error message for value length', () => {
      const inputValidationProps = {
        ...inputValidationDefaultProps,
        minLength: 10,
        maxLength: 35,
        pattern: /[a-z]+/,
        required: true,
      };
      const inputEventTarget = { value: 'this text is valid' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBeFalsy();
    });
  });

  describe('if requirements are not met', () => {
    let inputValidationProps: InputProps;

    beforeEach(() => {
      inputValidationProps = {
        ...inputValidationDefaultProps,
        minLength: 10,
        maxLength: 35,
        pattern: /[a-z]+/,
        required: true,
      };
    });

    it('should return error message for required value', () => {
      const inputEventTarget = { value: '' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('text input is required');
    });

    it('should return error message for value pattern', () => {
      const inputEventTarget = { value: 'THIS IS NOT VALID' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('text input pattern not valid');
    });

    it('should return error message for mininum length pattern', () => {
      const inputEventTarget = { value: 'Not valid' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('text input min length is 10');
    });

    it('should return error message for maximum length pattern', () => {
      const inputEventTarget = { value: 'This is not valid because it is too long' };
      const errorMessage = validateInput(inputEventTarget, inputValidationProps);

      expect(errorMessage).toBe('text input max length is 35');
    });
  });
});


