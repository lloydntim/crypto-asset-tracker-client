import {FocusEventHandler} from 'react';
import {DefaultTFuncReturn} from 'i18next';
import {StyledProps} from '../../helpers/createStyledProps';

export type DataListItem = {
  text: string;
  value: string;
};

export type InputChangeEvent = {
  name?: string;
  value?: string | undefined;
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
  requiredErrorMessage?: string;
  minLengthErrorMessage?: string;
  maxLengthErrorMessage?: string;
  onChange?: InputChangeEventHandler;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onDataListClick?: (item: DataListItem) => void;
}

export type MockFile = {
  name: string;
};

export type InputChangeEventTarget = {
  value?: string;
  files?: FileList | MockFile[] | null;
};

export const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    patternErrorMessage,
    requiredErrorMessage,
    minLengthErrorMessage,
    maxLengthErrorMessage,
  } = props;

  const file = files?.[0]?.name;
  const input = type === 'file' ? file : value;
  const inputPattern = type === 'email' ? emailPattern : pattern;

  if (required && !input?.length)
    return requiredErrorMessage || `${type} input is required`;
  else if (inputPattern && !input?.match(inputPattern))
    return patternErrorMessage || `${type} input pattern not valid`;
  else if (minLength && value && value.length < minLength)
    return minLengthErrorMessage || `${type} input min length is ${minLength}`;
  else if (maxLength && value && value.length > maxLength)
    return maxLengthErrorMessage || `${type} input max length is ${maxLength}`;
  else return '';
};
