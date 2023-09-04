import React, {useEffect} from 'react';
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

const languageCodes = Object.values(Languages) as string[];
/* eslint-disable react/jsx-props-no-spreading */
const LanguageSwitch = (props: LanguageSwitchProps) => {
  const {
    i18n: {changeLanguage, language},
  } = useTranslation();

  const onChangeHandler = ({value}: {value: string}) => {
    changeLanguage(value);
  };

  useEffect(() => {
    changeLanguage(language);
  }, [changeLanguage, language]);

  const createLanguageOptions = languageCodes.map((code) => ({
    value: code,
    labelTKey: `common:label.language.${code}`,
  }));

  // get's the first two letters as default language code sometimes this format: en-GB
  const isCurrentLanguage = languageCodes.indexOf(language.substring(0, 2));

  return (
    <Box $w="100%" {...props}>
      <Radios
        isButton
        selectedItem={isCurrentLanguage}
        $flex-row
        $mv={12}
        items={createLanguageOptions}
        onChange={onChangeHandler}
      />
    </Box>
  );
};

export default LanguageSwitch;
