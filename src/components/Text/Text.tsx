import React from 'react';

import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';

import {withLocalisation} from '../../hoc';
import {LocalisationProps} from '../../hoc/withLocalisation';

export interface TextProps extends LocalisationProps, StyledProps {
  className?: string;
  strong?: boolean;
}

const TextSt = createStylesProps('p');

const Text = ({children, className = '', strong, ...rest}: TextProps) => {
  const createParagraph = () => (
    <TextSt {...rest} className={className}>
      {children}
    </TextSt>
  );

  if (strong) return <strong>{createParagraph()}</strong>;

  return createParagraph();
};

export default withLocalisation<TextProps>(Text);
