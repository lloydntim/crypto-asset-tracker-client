import React, {useState} from 'react';

import {StyledProps} from '../../helpers/createStyledProps';
import Box from '../Box/Box';
import Radio from './Radio';
import RadioButton from './RadioButton';

export type RadioItem = {
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
const Radios = ({
  name = 'default',
  items,
  selectedItem = 0,
  onChange,
  isButton = false,
  ...rest
}: RadiosProps) => {
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
