import React, {FC, useState} from 'react';

import Radio from './Radio';
import Box from '../Box/Box';
import {StyledProps} from '../../helpers/createStyledProps';
import RadioButton from './RadioButton';

type RadioItem = {
  label: string;
  value: string;
};

type RadioChangeEventHandler = (event: {
  label: string;
  value: string;
  index: number;
}) => void;

interface RadiosProps extends StyledProps {
  name?: string;
  items: RadioItem[];
  selectedItem?: number;
  isButton?: boolean;
  onChange: RadioChangeEventHandler;
}
/* eslint-disable react/jsx-props-no-spreading */
const Radios: FC<RadiosProps> = ({
  name = 'default',
  items,
  selectedItem = 0,
  onChange,
  isButton = false,
  ...rest
}) => {
  const [selectedRadio, setSelectedRadio] = useState(selectedItem);

  const RadioElement = isButton ? RadioButton : Radio;
  return (
    <Box {...rest} className={`radios ${name}-radios`}>
      {items.map(({label, value}, index) => (
        <RadioElement
          key={index}
          value={value}
          name={`radio-${index}`}
          checked={selectedRadio === index}
          label={label}
          onChange={({target: {value}}) => {
            setSelectedRadio(index);
            onChange({label, value, index});
          }}
        />
      ))}
    </Box>
  );
};

export default Radios;
