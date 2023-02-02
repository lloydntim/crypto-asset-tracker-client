import React, {ChangeEvent, FC} from 'react';
import styled from 'styled-components';

export type SelectItemType = {
  text: string;
  value: number | string;
};

export interface SelectProps {
  name?: string;
  options: SelectItemType[];
  onChange: (value: string) => void;
}

const SelectSt = styled.select`
  margin: 0;
`;
const SelectOptionSt = styled.option`
  margin: 0;
`;

const Select: FC<SelectProps> = ({name = 'standard', options, onChange}) => (
  <SelectSt
    className={`select ${name}-select`}
    onChange={({target: {value}}) => onChange(value)}
  >
    {options.map(({text, value}, index) => (
      <SelectOptionSt key={index} value={value} className="select-option">
        {text}
      </SelectOptionSt>
    ))}
  </SelectSt>
);

export default Select;
