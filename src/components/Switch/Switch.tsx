import React, { ChangeEventHandler, FC, ReactElement } from 'react';

import './Switch.scss';

interface SwitchProps {
  name: string;
  label: string;
  isActive: boolean;
  disabled: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

/* eslint-disable react/jsx-props-no-spreading */
const Switch: FC<SwitchProps> = ({
  name,
  label,
  isActive,
  disabled,
  onChange,
}): ReactElement => (
  <label
    className={`switch ${disabled ? 'is-disabled' : ''} ${isActive ? 'is-active' : ''}`} htmlFor={name}>
    {label && <span className="switch-label-text">{label}</span>}
    <input
      id={name}
      disabled={disabled}
      className="switch-checkbox"
      type="checkbox"
      checked={isActive}
      onChange={onChange}
    />
    <span className="switch-background" />
  </label>
);

export default Switch;
