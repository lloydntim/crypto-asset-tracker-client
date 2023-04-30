import {useRef, useState, MutableRefObject, LegacyRef} from 'react';
import {InputChangeEvent} from '../components/Input/InputHelper';

export interface FormFieldDetails extends InputChangeEvent {
  // ref: LegacyRef<HTMLInputElement | undefined >;

  ref: MutableRefObject<HTMLInputElement | undefined>;
}
export type FormField = {
  [key: string]: FormFieldDetails;
};

export const createForm = (fields: string[]) =>
  fields.reduce((form: FormField, field: string) => {
    const [name, value] = field.split('-');
    const fieldName = name.replace('*', '');
    const formField: FormField = {
      [fieldName]: {
        ref: useRef<HTMLInputElement>(),
        value: value || '',
        error: '',
        files: [],
        required: field.includes('*'),
        name: fieldName,
      },
    };

    return {...form, ...formField};
  }, {});

const getRequiredFields = (form: FormField) =>
  Object.values(form)
    .filter((formField) => formField.required)
    .map((requiredField) => requiredField.name);

const FORM_VALID = 'valid';
const FORM_INVALID = 'invalid';

const useForm = (...fields: string[]) => {
  const defaultFormValues = createForm(fields);
  const [form, setForm] = useState(defaultFormValues);
  const [requiredFields, setRequiredFields] = useState(getRequiredFields(form));
  const [errorStatus, setErrorStatus] = useState('');

  const isFormValid = errorStatus === FORM_VALID && !requiredFields.length;

  const formFieldChangeHandler = (formFieldDetails: InputChangeEvent) => {
    const {name: formKeyName = '', error} = formFieldDetails;
    const formField = form[formKeyName];
    const upddatedFormField = {
      [formKeyName]: {...formField, ...formFieldDetails},
    };

    setRequiredFields(requiredFields.filter((field) => field !== formKeyName));
    setErrorStatus(error ? FORM_INVALID : FORM_VALID);
    setForm({...form, ...upddatedFormField});
  };

  const resetForm = () => {
    setForm(defaultFormValues);
    setRequiredFields(getRequiredFields(form));
    setErrorStatus('');
  };

  return {
    form,
    formFieldChangeHandler,
    resetForm,
    isFormValid,
  };
};

export default useForm;
