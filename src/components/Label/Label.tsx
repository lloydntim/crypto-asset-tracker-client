import React, {ReactNode, DetailedHTMLProps, LabelHTMLAttributes} from 'react';
import {GRAPE_EXTRA_DARK} from '../../constants/colors';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';
import withLocalisation, {LocalisationProps} from '../../hoc/withLocalisation';

interface LabelProps
  extends DetailedHTMLProps<
      LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    StyledProps,
    LocalisationProps {
  color?: string;
  children?: ReactNode;
  className?: string;
  htmlFor?: string;
}

const LabelSt = createStylesProps('label');

const Label = ({children, className = '', ...rest}: LabelProps) => {
  return (
    <LabelSt {...rest} className={className}>
      {children}
    </LabelSt>
  );
};

export default withLocalisation<LabelProps>(Label);
