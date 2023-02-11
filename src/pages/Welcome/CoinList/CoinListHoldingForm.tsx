import React, {FC} from 'react';
import {Form, IconButton, InputField, Select, Text} from '../../../components';
import {SelectItemType} from '../../../components/Select/Select';

const types: SelectItemType[] = [
  {
    value: 'wallet',
    text: 'Wallet',
  },
  {
    value: 'staking',
    text: 'Staking',
  },
  {
    value: 'exchange',
    text: 'Exchange',
  },
];

interface CoinListHoldingFormProps {
  holding: {
    name: string;
    amount: string;
    type: string;
  };
  onChange: (args: {field: string; value: string | number}) => void;
  onSubmit: () => void;
  submitText: string;
}

const CoinListHoldingForm: FC<CoinListHoldingFormProps> = ({
  holding,
  onChange,
  onSubmit,
}) => {
  return (
    <Form flex-row align-m>
      <Text flex-row mv={8} font-sz={14}>
        Name
      </Text>
      <InputField
        value={holding.name}
        w={40}
        onChange={({target: {value}}) => onChange({value, field: 'name'})}
      />
      <Text mv={8} flex-row font-sz={14}>
        Amount
      </Text>
      <InputField
        value={holding.amount}
        w={40}
        onChange={({target: {value}}) => onChange({value, field: 'amount'})}
      />
      <Text mv={8} flex-row font-sz={14}>
        Type
      </Text>

      <Select
        options={types}
        onChange={(value) => onChange({value, field: 'type'})}
        m={8}
      />
      <IconButton
        type="plus"
        align-c
        flex-row
        m={8}
        mr={0}
        onClick={onSubmit}
      />
    </Form>
  );
};

export default CoinListHoldingForm;
