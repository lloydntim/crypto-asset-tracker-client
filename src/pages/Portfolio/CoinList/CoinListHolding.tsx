import React, {ChangeEvent, useState} from 'react';
import {Box, IconButton, Message, Text} from '../../../components';
import {GRAPE_MEDIUM_DARK, GREY, RED} from '../../../constants/colors';
import CoinListHoldingInput from './CoinListHoldingInput';
import {
  Currency,
  Holding,
  coinListDialogMapper,
  coinListInputValidationMapper,
} from './CoinListHelper';
import {formatToCurrency} from '../../../utils';
import {useMutation} from '@apollo/client';
import {
  GET_COIN_LIST,
  REMOVE_COIN_HOLDING,
  UPDATE_COIN_HOLDING,
} from '../../../graphql/operations';
import {displayResponseErrorMessage} from '../../../helpers/displayResponseErrorMessage';
import {Dialog} from '../../../layouts';

interface CoinListHoldingProps extends Holding {
  location: string;
  editMode: boolean;
  currency: Currency;
}

const {amount: amountInputValidationProps, name: nameInputValidationProps} =
  coinListInputValidationMapper;

const CoinListHolding = ({
  id: holdingId,
  value,
  name,
  amount,
  location,
  editMode,
  currency,
}: CoinListHoldingProps) => {
  const {titleTKey: dialogTitleTKey, messageTKey: dialogMessageTKey} =
    coinListDialogMapper.removeCoinHolding;
  const [dialog, setDialog] = useState(false);
  const [
    updateCoinHolding,
    {
      loading: updateCoinHoldingMutationLoading,
      error: updateCoinHoldingMutationError,
    },
  ] = useMutation(UPDATE_COIN_HOLDING, {
    refetchQueries: [GET_COIN_LIST],
  });
  const [
    removeCoinHolding,
    {
      loading: removeCoinHoldingMutationLoading,
      error: removeCoinHoldingMutationError,
    },
  ] = useMutation(REMOVE_COIN_HOLDING, {
    refetchQueries: [GET_COIN_LIST],
  });

  const loading =
    updateCoinHoldingMutationLoading || removeCoinHoldingMutationLoading;
  const error =
    updateCoinHoldingMutationError || removeCoinHoldingMutationError;

  const updateCoinHoldingHandler =
    (key: keyof Holding) =>
    ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
      updateCoinHolding({
        variables: {
          holdingId,
          holding: {
            [key]: key === 'amount' ? parseFloat(value) : value,
          },
        },
      });
    };

  const removeCoinHoldingHandler = () => {
    setDialog(false);
    removeCoinHolding({variables: {holdingId}});
  };

  return (
    <>
      <Dialog
        titleTKey={dialogTitleTKey}
        visible={dialog}
        onCancelButtonClick={() => setDialog(false)}
        onContinueButtonClick={removeCoinHoldingHandler}
      >
        <Text tKey={dialogMessageTKey} />
      </Dialog>
      <Box
        $flex-row
        $ph={8}
        $br={8}
        $align-m
        $bgcolor={GRAPE_MEDIUM_DARK}
        $mv={2}
        $min-w={editMode ? 452 : 288}
      >
        <Box $pl={8} $br-tl={8} $br-bl={8} $w={44} $pv={4}>
          <Box $bgcolor={GREY} $sz={24} $br={12} $flex-row />
        </Box>

        <CoinListHoldingInput
          $txt-align-l
          editMode={editMode}
          value={name}
          $min-w={editMode ? 120 : 64}
          $mh={8}
          location={location}
          onBlur={updateCoinHoldingHandler('name')}
          {...nameInputValidationProps}
        />
        <CoinListHoldingInput
          $flex-row
          $min-w={editMode ? 120 : 48}
          $mh={8}
          $align-r
          editMode={editMode}
          value={amount.toString()}
          location={location}
          onBlur={updateCoinHoldingHandler('amount')}
          {...amountInputValidationProps}
        />
        <Box
          $flex="1"
          $flex-row
          $align-m
          $align-r
          $min-w={editMode ? 124 : 88}
          $mh={8}
          $br-tr={8}
          $br-br={8}
        >
          <Text $font-sz={14}>
            {formatToCurrency(value, currency, location)}
          </Text>

          {editMode && (
            <IconButton
              $mh={8}
              type="delete"
              iconSize={18}
              onClick={() => setDialog(true)}
            />
          )}
        </Box>

        {displayResponseErrorMessage(error)}
        {loading && <Message type="info" tKey="common:message.loading.text" />}
      </Box>
    </>
  );
};

export default CoinListHolding;
