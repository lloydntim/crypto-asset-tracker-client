import {
  // useRef,
  useState,
  createRef,
  RefObject,
} from 'react';
import {InputChangeEvent} from '../components/Input/InputHelper';

export interface FormFieldDetails extends InputChangeEvent {
  // ref: LegacyRef<HTMLInputElement | undefined >;

  ref: RefObject<HTMLInputElement>;
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
        // ref: useRef<HTMLInputElement>(),
        ref: createRef<HTMLInputElement>(),
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

const getFieldErrors = (form: FormField) =>
  Object.values(form).map((field) => field.error || '');

const useForm = (...fields: string[]) => {
  const defaultFormValues = createForm(fields);
  const [form, setForm] = useState(defaultFormValues);
  const [requiredFields, setRequiredFields] = useState(getRequiredFields(form));
  const [errors, setErrors] = useState<string[]>([]);

  const isFormValid =
    getFieldErrors(form).every((err: string) => !err.length) &&
    !requiredFields.length;
  const formFieldChangeHandler = (formFieldDetails: InputChangeEvent) => {
    const {name: formKeyName = '', error = ''} = formFieldDetails;
    const formField = form[formKeyName];
    const upddatedFormField = {
      [formKeyName]: {...formField, ...formFieldDetails},
    };
    setErrors([...errors, error]);
    setRequiredFields(requiredFields.filter((field) => field !== formKeyName));
    setForm({...form, ...upddatedFormField});
  };

  const resetForm = () => {
    setForm(defaultFormValues);
    setRequiredFields(getRequiredFields(form));
  };

  return {
    form,
    formFieldChangeHandler,
    resetForm,
    isFormValid,
  };
};

export default useForm;
