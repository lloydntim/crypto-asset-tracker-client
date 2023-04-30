import React, {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import {GRAPE_DARK, GRAPE_EXTRA_DARK} from '../../constants/Colors';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';

const InputFieldSt = createStylesProps('input');

/* eslint-disable react/display-name  */
const InputField: FC<DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  StyledProps> = forwardRef(
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
      ...rest
    },
    ref,
  ) => {
    return (
      <InputFieldSt
        {...rest}
        {...{
          ref,
          bcolor,
          bw,
          color,
          m,
          br,
          ph,
          pv,
          flex,
        }}
      />
    );
  },
);

export default InputField;
