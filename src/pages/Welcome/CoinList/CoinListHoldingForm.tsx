import React, {FC, ReactElement, useMemo, useState} from 'react';
import styled from 'styled-components';
import {Box, Container, Select, Text} from '../../../components';

const types = [
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
  onChange: (args: {field: string; value: string}) => void;
  onSubmit: () => void;
  submitText: string;
}

const CustomButton = styled.button`
  border: none;
  background-color: white;
  color: black;
`;

const CustomInput = styled.input`
  color: black;
`;

const CoinListHoldingForm: FC<CoinListHoldingFormProps> = ({
  holding,
  onChange,
  onSubmit,
  submitText,
}) => {
  return (
    <Container>
      <form>
        <Box flex-col>
          <Text>Name</Text>
          <CustomInput
            value={holding.name}
            onChange={({target: {value}}) => onChange({value, field: 'name'})}
          />
          <Text>Amount</Text>
          <CustomInput
            value={holding.amount}
            onChange={({target: {value}}) => onChange({value, field: 'amount'})}
          />
          <Text>Type</Text>
          {/*
            <CustomInput
              value={holding.type}
              onChange={({target: {value}}) => {
                setHolding({...holding, type: value});
              }}
            />
          */}
          <Select
            options={types}
            onChange={(value) => onChange({value, field: 'type'})}
          />
          <CustomButton onClick={onSubmit}>{submitText}</CustomButton>
        </Box>
      </form>
    </Container>
  );
};

export default CoinListHoldingForm;
