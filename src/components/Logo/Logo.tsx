import React from 'react';

import Box from '../Box/Box';
import Text from '../Text/Text';

import {StyledProps} from '../../helpers/createStyledProps';
import {WHITE} from '../../constants/colors';
import Icon from '../Icon/Icon';

interface LogoProps extends StyledProps {
  size?: number;
  textSize?: number;
  showText?: boolean;
}

const LOGO_SIZE_DEFAULT = 220;

/* eslint-disable react/jsx-props-no-spreading */
const Logo = ({
  size = LOGO_SIZE_DEFAULT,
  showText = false,
  textSize = 0,
  ...rest
}: LogoProps) => {
  return (
    <Box {...rest}>
      <Icon type="logo" color={WHITE} sz={size} />
      {showText && (
        <Text mh={textSize || size / 2} font-sz={textSize || size / 2}>
          CryptoAssetTracker
        </Text>
      )}
    </Box>
  );
};

export default Logo;
