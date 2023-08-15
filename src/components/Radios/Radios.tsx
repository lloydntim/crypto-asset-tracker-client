import React, {useState} from 'react';

import {StyledProps} from '../../helpers/createStyledProps';
import Box from '../Box/Box';
import Radio from './Radio';
import RadioButton from './RadioButton';

export type RadioItem = {
  labelTKey?: string;
  label?: string;
  value: string;
};

export type RadioChangeEvent = RadioItem & {
  index: number;
};

export type RadioChangeEventHandler = (event: RadioChangeEvent) => void;

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
      {items.map(({label, labelTKey, value}, index) => (
        <RadioElement
          key={index}
          value={value}
          labelTKey={labelTKey}
          name={`radio-${index}`}
          checked={selectedRadio === index}
          label={label}
          onChange={({target: {value}}) => {
            setSelectedRadio(index);
            onChange({label, labelTKey, value, index});
          }}
        />
      ))}
    </Box>
  );
};

export default Radios;
