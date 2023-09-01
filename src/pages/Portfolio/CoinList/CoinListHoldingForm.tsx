import React, {ChangeEvent, useState} from 'react';
import {
  Container as FormCointainer,
  Form,
  IconButton,
  InputField,
  Message,
  Select,
  Text,
} from '../../../components';

import {Holding, HoldingStorageType, types} from './CoinListHelper';
import {useMutation} from '@apollo/client';
import {ADD_COIN_HOLDING, GET_COIN_LIST} from '../../../graphql/operations';
import {displayResponseErrorMessage} from '../../../helpers/displayResponseErrorMessage';

interface CoinListHoldingFormProps {
  coinId: string;
  visible: boolean;
}

const CoinListHoldingForm = ({coinId, visible}: CoinListHoldingFormProps) => {
  const defaultInputValues = {
    name: '',
    amount: '',
    type: types[0].value as HoldingStorageType,
  };

  const inputKeys = Object.keys(defaultInputValues);
  const [holding, setHolding] = useState(defaultInputValues);

  const [addCoinHolding, {loading, error}] = useMutation(ADD_COIN_HOLDING, {
    refetchQueries: [GET_COIN_LIST],
  });

  const inputChangeHandler =
    (key: string) =>
    ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
      setHolding({...holding, [key]: value});
    };

  const addCoinHoldingHandler = () => {
    const {type, amount, name} = holding;
    console.log(coinId);
    addCoinHolding({
      variables: {
        id: coinId,
        holding: {
          amount: parseFloat(amount),
          type,
          name,
        },
      },
    });
    setHolding(defaultInputValues);
  };

  if (!visible) return null;

  return (
    <FormCointainer $flex-col>
      <Form $flex-row $align-m>
        {inputKeys.map(
          (key: keyof Pick<Holding, 'amount' | 'name' | 'type'>, index) => {
            return (
              <>
                <Text
                  key={index}
                  $flex-row
                  $mv={8}
                  $font-sz={14}
                  tKey={`portfolio:coinlist.form.addHolding.${key}`}
                />
                {key !== 'type' ? (
                  <InputField
                    name={key}
                    value={holding[key]}
                    $w={40}
                    onChange={inputChangeHandler(key)}
                  />
                ) : (
                  <Select
                    key={index}
                    name="type"
                    options={types}
                    onChange={(value) =>
                      setHolding({
                        ...holding,
                        type: value as HoldingStorageType,
                      })
                    }
                    $m={8}
                  />
                )}
              </>
            );
          },
        )}

        <IconButton
          type="plus"
          $align-c
          $flex-row
          $m={8}
          $mr={0}
          onClick={addCoinHoldingHandler}
        />
      </Form>
      {displayResponseErrorMessage(error)}
      {loading && <Message type="info" tKey="common:message.loading.text" />}
    </FormCointainer>
  );
};

export default CoinListHoldingForm;
