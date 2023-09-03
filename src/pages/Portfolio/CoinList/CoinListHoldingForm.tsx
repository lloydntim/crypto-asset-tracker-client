import React from 'react';
import {
  Container as FormCointainer,
  Form,
  IconButton,
  Message,
  Select,
  Input,
} from '../../../components';

import {
  Holding,
  HoldingStorageType,
  coinListInputValidationMapper,
  types,
} from './CoinListHelper';
import {useMutation} from '@apollo/client';
import {ADD_COIN_HOLDING, GET_COIN_LIST} from '../../../graphql/operations';
import {displayResponseErrorMessage} from '../../../helpers/displayResponseErrorMessage';
import {useForm} from '../../../hooks';
import {capitalizeString} from '../../../utils';
import {InputProps} from '../../../components/Input/InputHelper';

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

  const {form, resetForm, isFormValid, formFieldChangeHandler} = useForm(
    'amount*',
    'name*',
    `type-${types[0].value as HoldingStorageType}`,
  );

  const inputKeys = Object.keys(defaultInputValues);

  const [addCoinHolding, {loading, error}] = useMutation(ADD_COIN_HOLDING, {
    refetchQueries: [GET_COIN_LIST],
  });

  const addCoinHoldingHandler = () => {
    const {amount, name, type} = form;
    addCoinHolding({
      variables: {
        id: coinId,
        holding: {
          type: type.value,
          amount: parseFloat(amount.value),
          name: name.value,
        },
      },
    });
    resetForm();
  };

  if (!visible) return null;

  return (
    <FormCointainer $flex-col $ph={12}>
      <Form $flex-row $align-t>
        {inputKeys.map(
          (key: keyof Pick<Holding, 'amount' | 'name' | 'type'>, index) => {
            const fieldProps = form[key];
            const validationProps = coinListInputValidationMapper[key];

            return (
              <>
                {key !== 'type' ? (
                  <Input
                    labelTKey={`portfolio:coinlist.form.addHolding.${key}`}
                    {...{...fieldProps, ...validationProps}}
                    placeholderTKey={`portfolio:coinlist.input.placeholder.enter${capitalizeString(
                      key,
                    )}`}
                    $w={40}
                    $mh={8}
                    onChange={formFieldChangeHandler}
                  />
                ) : (
                  <Select
                    key={index}
                    name="type"
                    $mh={8}
                    $flex-col
                    labelTKey={`portfolio:coinlist.form.addHolding.${key}`}
                    options={types}
                    onChange={(value) => {
                      formFieldChangeHandler({
                        name: 'type',
                        value: value as HoldingStorageType,
                      });
                    }}
                  />
                )}
              </>
            );
          },
        )}

        <IconButton
          type="plus"
          disabled={!isFormValid}
          $flex-row
          $mt={36}
          $mb={8}
          $mh={8}
          onClick={addCoinHoldingHandler}
        />
      </Form>
      {displayResponseErrorMessage(error)}
      {loading && <Message type="info" tKey="common:message.loading.text" />}
    </FormCointainer>
  );
};

export default CoinListHoldingForm;
