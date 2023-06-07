// import React, {FC, ReactElement} from 'react';
// import styled from 'styled-components';
// import createStylesProps from '../../helpers/createStyledProps';
// import {withLocalisation} from '../../hoc';

// import {StyledTextProps, TextProps} from '../Text/Text';

// export type HeadlineSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

// interface HeadlineProps extends TextProps {
//   size?: HeadlineSize;
// }

// /* const createHeadlineStyle = (element: HeadlineSize) => styled(
//   createStylesProps(element),
// )`
//   ${(props: StyledTextProps) => props['font-sz'] && `${props['font-sz']}`}
// `;
//  */

// const HeadlineSt = styled(createStylesProps('h1'))`
//   ${(props: StyledTextProps) => props['font-sz'] && `${props['font-sz']}`}
// `;

// const Headline: FC<HeadlineProps> = ({
//   size = 'h1',
//   children,
//   className = '',
//   ...rest
// }): ReactElement => {
//   // const HeadlineSt = createHeadlineStyle(size);

//   return (
//     <HeadlineSt
//       {...rest}
//       className={`headline headline-size-${size} ${className}`}
//     >
//       {children}
//     </HeadlineSt>
//   );
// };

// export default withLocalisation<HeadlineProps>(Headline);

import React, {FC, ReactElement} from 'react';
import styled from 'styled-components';

import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';

import {withLocalisation} from '../../hoc';
import {LocalisationProps} from '../../hoc/withLocalisation';
import {TextProps} from '../Text/Text';

export type HeadlineSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
export interface HeadlineProps extends TextProps {
  className?: string;
  strong?: boolean;
  size?: HeadlineSize;
}

const headlineElementSizeMapper = {
  h1: createStylesProps('h1'),
  h2: createStylesProps('h2'),
  h3: createStylesProps('h3'),
  h4: createStylesProps('h4'),
  h5: createStylesProps('h5'),
};

const Headline: FC<HeadlineProps> = ({
  children,
  className = '',
  size = 'h1',
  ...rest
}) => {
  const HeadlineSt = headlineElementSizeMapper[size];

  return (
    <HeadlineSt m={0} p={0} className={className} {...rest}>
      {children}
    </HeadlineSt>
  );
};

export default withLocalisation<HeadlineProps>(Headline);
