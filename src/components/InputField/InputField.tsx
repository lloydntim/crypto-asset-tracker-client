import React, {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import {GRAPE_DARK, GRAPE_EXTRA_DARK} from '../../constants/colors';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';
import {DefaultTFuncReturn} from 'i18next';
import {useTranslation} from 'react-i18next';

const InputFieldSt = createStylesProps('input');

/* eslint-disable react/display-name  */
const InputField: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    StyledProps & {placeholderTKey?: DefaultTFuncReturn}
> = forwardRef(
  (
    {
      m = 8,
      bcolor = GRAPE_DARK,
      br = 8,
      color = GRAPE_EXTRA_DARK,
      ph = 8,
      pv = 8,
      bw = 1,
      flex = '1',
      placeholder,
      placeholderTKey,
      ...rest
    },
    ref,
  ) => {
    const {t} = useTranslation();
    return (
      <InputFieldSt
        {...{
          ['aria-label']: 'core-input',
          ref,
          bcolor,
          bw,
          color,
          m,
          br,
          ph,
          pv,
          flex,
          placeholder: t(placeholderTKey || placeholder),
          ...rest,
        }}
      />
    );
  },
);

export default InputField;
