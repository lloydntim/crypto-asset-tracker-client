import React, {DetailedHTMLProps, LabelHTMLAttributes} from 'react';
import {GRAPE_EXTRA_DARK} from '../../constants/Colors';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';

const LabelSt = createStylesProps('label');

const Label = ({
  color = GRAPE_EXTRA_DARK,
  children,
  ...rest
}: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> &
  StyledProps) => {
  return (
    <LabelSt
      {...rest}
      {...{
        color,
      }}
    >
      {children}
    </LabelSt>
  );
};

export default Label;
