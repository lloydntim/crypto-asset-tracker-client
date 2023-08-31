import React from 'react';
import {Box, IconButton, Text} from '../../../components';
import Table from '../../../components/Table';
import {GRAPE_EXTRA_LIGHT, GREY} from '../../../constants/colors';
import StorageOptionEditField from './StorageOptionEditField';
import {Currency, Holding} from './CoinListHelper';
import {formatToCurrency} from '../../../utils';

interface CoinListHoldingProps extends Omit<Holding, 'type'> {
  location: string;
  editMode: boolean;
  convert: Currency;
  index: number;
  updateCoinHoldingHandler: (args: {
    value: string;
    key: string;
    holdingId: string;
    index?: number;
  }) => void;
  removeCoinHoldingHandler: () => void;
}

const CoinListHolding = ({
  id: holdingId,
  value,
  name,
  amount,
  location,
  updateCoinHoldingHandler,
  removeCoinHoldingHandler,
  editMode,
  convert,
  index,
}: CoinListHoldingProps) => {
  return (
    <Table $w="100%">
      <Box
        $flex-row
        $br={8}
        $ph={8}
        $align-m
        $bgcolor={GRAPE_EXTRA_LIGHT}
        $mv={2}
      >
        <Box $pl={8} $br-tl={8} $br-bl={8} $w={44} $pv={4} $valign-m>
          <Box $bgcolor={GREY} $sz={24} $br={12} $flex-row />
        </Box>

        <StorageOptionEditField
          $flex="1"
          $txt-align-l
          editMode={editMode}
          value={name}
          location={location}
          onBlur={({target: {value}}) => {
            updateCoinHoldingHandler({value, key: 'name', holdingId});
          }}
        />
        <StorageOptionEditField
          $flex-row
          $w={162}
          $align-r
          $ph={12}
          editMode={editMode}
          value={amount.toFixed()}
          location={location}
          onBlur={({target: {value}}) => {
            updateCoinHoldingHandler({value, key: 'amount', holdingId, index});
          }}
        />

        <Box $w={100} $flex-row $align-r $br-tr={8} $br-br={8} $pr={8}>
          <Text $valign-m $font-sz={14}>
            {formatToCurrency(value, convert, location)}
          </Text>
        </Box>
        {editMode && (
          <IconButton
            $mh={8}
            type="delete"
            iconSize={18}
            onClick={() => {
              removeCoinHoldingHandler();
            }}
          />
        )}
      </Box>
    </Table>
  );
};

export default CoinListHolding;
