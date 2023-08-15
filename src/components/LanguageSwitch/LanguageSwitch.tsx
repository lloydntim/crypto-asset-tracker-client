import React from 'react';
import {useTranslation} from 'react-i18next';

import Box from '../Box/Box';

import {StyledProps} from '../../helpers/createStyledProps';
import Radios from '../Radios/Radios';

enum Languages {
  ENGLISH = 'en',
  GERMAN = 'de',
}

interface LanguageSwitchProps extends StyledProps {
  className?: string;
}

const languageCodes = Object.values(Languages);
/* eslint-disable react/jsx-props-no-spreading */
const LanguageSwitch = (props: LanguageSwitchProps) => {
  const {
    i18n: {changeLanguage},
  } = useTranslation();

  const onChangeHandler = ({value}: {value: string}) => {
    changeLanguage(value);
  };

  const createLanguageOptions = languageCodes.map((code) => ({
    value: code,
    labelTKey: `common:label.language.${code}`,
  }));

  return (
    <Box w="100%" {...props}>
      <Radios
        isButton
        flex-row
        mv={12}
        items={createLanguageOptions}
        onChange={onChangeHandler}
      />
    </Box>
  );
};

export default LanguageSwitch;
