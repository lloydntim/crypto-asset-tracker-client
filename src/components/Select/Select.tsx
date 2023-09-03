import React, {useState} from 'react';
import {GRAPE_EXTRA_LIGHT, WHITE} from '../../constants/colors';
import {StyledProps} from '../../helpers/createStyledProps';
import Box from '../Box/Box';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Span from '../Span/Span';
import Label from '../Label/Label';

export type SelectItemType = {
  text: string;
  value: string;
};

export interface SelectProps extends StyledProps {
  label?: string;
  labelTKey?: string;
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
  onMouseDown: (value: string) => void;
}

const LABEL_MARGIN_VERTICAL = 8;
const LABEL_FONT_SIZE = 16;
const OPTIONS_TOP_POSITION = 40;

const SelectOption = ({
  value,
  text,
  className,
  selected,
  // Used instead of onClick to avoid parents onBlur event being called before click event happens
  // see ref: https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue
  onMouseDown,
  ...rest
}: SelectOptionProps) => {
  return (
    <Box className={className} $pv={1} {...rest}>
      <Button
        $w="100%"
        $br={0}
        $bgcolor={selected ? GRAPE_EXTRA_LIGHT : WHITE}
        onMouseDown={() => onMouseDown(value)}
      >
        {text}
      </Button>
    </Box>
  );
};

const Select = ({
  label = '',
  labelTKey = '',
  name = 'standard',
  options,
  onChange,
  ...rest
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [optionsVisible, setOptionsVisible] = useState(false);

  // Calculates vertical position of options list when label is visible and when not
  const optionsListTopPosition =
    OPTIONS_TOP_POSITION +
    (label || labelTKey ? LABEL_FONT_SIZE + LABEL_MARGIN_VERTICAL * 2 : 0);
  return (
    <Box
      role="select"
      className={`select ${name}-select`}
      {...rest}
      $pos-rel
      onBlur={() => setOptionsVisible(false)}
    >
      {(label || labelTKey) && (
        <Label $mv={8} tKey={labelTKey} $font-sz={LABEL_FONT_SIZE}>
          {label}
        </Label>
      )}
      <Button
        className="select-value"
        $align-m
        $ph={16}
        onClick={() => setOptionsVisible(!optionsVisible)}
      >
        {options[selectedOption].text}
        <Span $flex-row $ml={4}>
          <Icon type="arrow-down" $sz={16} />
        </Span>
      </Button>
      {optionsVisible && (
        <Box
          $pos-abs
          $pos-l={0}
          $pos-t={optionsListTopPosition}
          className="select-options-group"
        >
          {options.map(({text, value}, index) => (
            <SelectOption
              key={index}
              value={value}
              selected={selectedOption === index}
              className="select-option"
              text={text}
              onMouseDown={(value: string) => {
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
