import React, {ChangeEventHandler, forwardRef} from 'react';
import {GRAPE_DARK, GRAPE_EXTRA_DARK} from '../../constants/colors';
import createStylesProps from '../../helpers/createStyledProps';
import {useTranslation} from 'react-i18next';
import {InputProps} from '../Input/InputHelper';

const InputFieldSt = createStylesProps('input');

type InputFieldProps = Omit<InputProps, 'onChange'> & {
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

/* eslint-disable react/display-name  */
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      $m = 8,
      $bcolor = GRAPE_DARK,
      $br = 8,
      $color = GRAPE_EXTRA_DARK,
      $ph = 12,
      $pv = 10,
      $pt,
      $pb,
      $pl,
      $pr,
      $bw = 1,
      $flex = '1',
      placeholder = '',
      placeholderTKey = '',
      ...rest
    },
    ref,
  ) => {
    const {t} = useTranslation();
    return (
      <InputFieldSt
        {...{
          'aria-label': 'core-input',
          ref,
          $bcolor,
          $bw,
          $color,
          $m,
          $br,
          $pl,
          $pr,
          $pt,
          $pb,
          ...(!$pl && !$pr && {$ph}),
          ...(!$pt && !$pb && {$pv}),
          $flex,
          ...((placeholderTKey || placeholder) && {
            placeholder: t(placeholderTKey || placeholder),
          }),
          ...rest,
        }}
      />
    );
  },
);

export default InputField;
