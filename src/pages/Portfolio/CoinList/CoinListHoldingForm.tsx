import React from 'react';
import {Form, IconButton, InputField, Select, Text} from '../../../components';

import {StorageOptionType, types} from './CoinListHelper';

interface CoinListHoldingFormProps {
  holding: {
    name: string;
    amount: string;
    type: StorageOptionType;
  };
  onChange: (args: {field: string; value: string | number}) => void;
  onSubmit: () => void;
  submitText: string;
}

const CoinListHoldingForm = ({
  holding,
  onChange,
  onSubmit,
}: CoinListHoldingFormProps) => {
  return (
    <Form $flex-row $align-m>
      <Text
        $flex-row
        $mv={8}
        $font-sz={14}
        tKey="portfolio:coinlist.form.addHolding.name"
      />

      <InputField
        name="name"
        value={holding.name}
        $w={40}
        onChange={({target: {value}}) => onChange({value, field: 'name'})}
      />
      <Text
        $mv={8}
        $flex-row
        $font-sz={14}
        tKey="portfolio:coinlist.form.addHolding.amount"
      />
      <InputField
        name="amount"
        value={holding.amount}
        $w={40}
        onChange={({target: {value}}) => onChange({value, field: 'amount'})}
      />
      <Text
        $mv={8}
        $flex-row
        $font-sz={14}
        tKey="portfolio:coinlist.form.addHolding.type"
      />

      <Select
        name="type"
        options={types}
        onChange={(value) => onChange({value, field: 'type'})}
        $m={8}
      />
      <IconButton
        type="plus"
        $align-c
        $flex-row
        $m={8}
        $mr={0}
        onClick={onSubmit}
      />
    </Form>
  );
};

export default CoinListHoldingForm;
