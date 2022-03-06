import React, { FC, useState } from 'react';

import Radio from './Radio';

import './Radios.scss';

type RadioItem = {
  label: string;
  value: string;
}

type RadioChangeEventHandler = (
  event: {
    label: string,
    value: string | number,
    index: number
  }
) => void;


interface RadiosProps {
  name?: string;
  items: RadioItem[];
  selectedItem: number;
  onChange: RadioChangeEventHandler;
}
/* eslint-disable react/jsx-props-no-spreading */
const Radios: FC<RadiosProps> = ({
  name = '',
  items,
  selectedItem = 0,
  onChange,
}) => {
  const [selectedRadio, setSelectedRadio] = useState(selectedItem);
  return (
    <div className={`radios ${name}-radios`}>
      {items.map(({ label, value }, index) => (
        <Radio
          key={index}
          value={value}
          name={`radio-${index}`}
          checked={selectedRadio === index}
          label={label}
          onChange={({ target: { value } }) => {
            setSelectedRadio(index);
            onChange({ label, value, index });
          }}
        />
      ))}
    </div>
  );
};

export default Radios;
