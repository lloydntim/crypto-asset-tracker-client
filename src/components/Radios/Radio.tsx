import React, { ChangeEventHandler, FC, ReactElement } from 'react';

/* eslint-disable react/jsx-props-no-spreading */
interface RadioProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Radio: FC<RadioProps> = ({
  name,
  value,
  label = '',
  checked,
  onChange,
}): ReactElement => (
  <label className="radio" htmlFor={name}>
    <input
      id={name}
      value={value}
      className="radio-input"
      type="radio"
      checked={checked}
      onChange={onChange}
    />
    <span className="radio-background" />
    {label && <span className="radio-label">{label}</span>}
  </label>
);

export default Radio;
