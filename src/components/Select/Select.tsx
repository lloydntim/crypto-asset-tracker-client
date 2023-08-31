import React, {useState} from 'react';
import {GRAPE_EXTRA_LIGHT, WHITE} from '../../constants/colors';
import {StyledProps} from '../../helpers/createStyledProps';
import Box from '../Box/Box';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Span from '../Span/Span';

export type SelectItemType = {
  text: string;
  value: string;
};

export interface SelectProps extends StyledProps {
  name?: string;
  options: SelectItemType[];
  onChange: (value: string) => void;
}

interface SelectOptionProps extends StyledProps {
  value: string;
  text: string;
  selected: boolean;
  className: string;
  role?: string;
  onClick: (value: string) => void;
}
const SelectOption = ({
  value,
  text,
  className,
  selected,
  onClick,
  ...rest
}: SelectOptionProps) => {
  return (
    <Box className={className} pv={1} {...rest}>
      <Button
        $w="100%"
        br={0}
        bgcolor={selected ? GRAPE_EXTRA_LIGHT : WHITE}
        onClick={() => onClick(value)}
      >
        {text}
      </Button>
    </Box>
  );
};

const Select = ({
  name = 'standard',
  options,
  onChange,
  ...rest
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [optionsVisible, setOptionsVisible] = useState(false);
  return (
    <Box role="select" className={`select ${name}-select`} {...rest} pos-rel>
      <Button
        className="select-value"
        align-m
        ph={16}
        onClick={() => setOptionsVisible(!optionsVisible)}
      >
        {options[selectedOption].text}
        <Span flex-row ml={4}>
          <Icon type="arrow-down" sz={16} />
        </Span>
      </Button>
      {optionsVisible && (
        <Box pos-abs pos-l={0} pos-t={40} className="select-options-group">
          {options.map(({text, value}, index) => (
            <SelectOption
              key={index}
              value={value}
              selected={selectedOption === index}
              className="select-option"
              text={text}
              onClick={(value: string) => {
                setSelectedOption(index);
                setOptionsVisible(false);
                onChange(value);
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Select;
