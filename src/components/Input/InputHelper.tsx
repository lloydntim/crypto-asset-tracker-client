import {FocusEventHandler} from 'react';
import {t, DefaultTFuncReturn} from 'i18next';
import {StyledProps} from '../../helpers/createStyledProps';

export type DataListItem = {
  text: string;
  value: string;
};

export type InputChangeEvent = {
  name?: string;
  value: string;
  files?: FileList | File[] | null;
  error?: string;
  required?: boolean;
};
export type InputChangeEventHandler = (arg: InputChangeEvent) => void;
export interface InputProps extends StyledProps {
  className?: string;
  id?: string;
  label?: string;
  labelTKey?: string;
  labelColor?: string;
  autoComplete?: string;
  autoCapitalize?: string;
  dataList?: DataListItem[];
  name?: string;
  type?: string;
  tabIndex?: number;
  placeholder?: string | undefined;
  placeholderTKey?: DefaultTFuncReturn;
  value?: string | undefined;
  defaultValue?: string | undefined;
  pattern?: RegExp;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  checked?: boolean;
  disabled?: boolean;
  patternErrorMessage?: string;
  patternErrorMessageTKey?: string;
  requiredErrorMessage?: string;
  minLengthErrorMessage?: string;
  maxLengthErrorMessage?: string;
  onChange?: InputChangeEventHandler;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onDataListClick?: (item: DataListItem) => void;
}

export type InputValidationMessage = {
  text: string;
  type: string;
};

export type MockFile = {
  name: string;
};

export type InputChangeEventTarget = {
  value?: string;
  files?: FileList | MockFile[] | null;
};

const VALIDATION_T_KEY_PATH = 'common:input.error.validation';

export const EMAIL_INPUT_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validationMessageDefaultProps = {text: '', type: ''};

export const validateInput = (
  eventTarget: InputChangeEventTarget,
  props: InputProps,
) => {
  const {value, files} = eventTarget;
  const {
    type,
    pattern,
    required,
    minLength,
    maxLength,
    patternErrorMessage = '',
    patternErrorMessageTKey = '',
    requiredErrorMessage = '',
    minLengthErrorMessage = '',
    maxLengthErrorMessage = '',
  } = props;
  const file = files?.[0]?.name;
  const input = type === 'file' ? file : value;
  const inputPattern = type === 'email' ? EMAIL_INPUT_PATTERN : pattern;
  if (required && !input?.length)
    return (
      requiredErrorMessage || t(`${VALIDATION_T_KEY_PATH}.required`, {type})
    );
  else if (inputPattern && !input?.match(inputPattern))
    return (
      patternErrorMessage ||
      t(patternErrorMessageTKey) ||
      t(`${VALIDATION_T_KEY_PATH}.pattern`, {type})
    );
  else if (minLength && value && value.length < minLength)
    return (
      minLengthErrorMessage ||
      t(`${VALIDATION_T_KEY_PATH}.minLength`, {type, minLength})
    );
  else if (maxLength && value && value.length > maxLength)
    return (
      maxLengthErrorMessage ||
      t(`${VALIDATION_T_KEY_PATH}.maxLength`, {type, maxLength})
    );
  else return '';
};
