import React, {ReactNode} from 'react';
import {Box, Headline, Span} from '../../../components';
import {
  HOLDING_TYPES_T_KEY_PATH,
  Holding,
  StorageOption,
  formatAmount,
} from './CoinListHelper';
import {DARKGREY, LIGHTGREY} from '../../../constants/colors';
import CoinListHoldingForm from './CoinListHoldingForm';

interface CoinListStorageOptionsProps {
  holdingValue: Pick<Holding, 'name' | 'type'> & {amount: string};
  editMode: boolean;
  location: string;
  options: StorageOption[];
  renderOption: (item: StorageOption, index: number) => ReactNode;
  onSubmitOptionHolding: () => void;
  onChangeHoldingValue: (args: {field: string; value: string | number}) => void;
}

const CoinListStorageOptions = ({
  editMode,
  options,
  location,
  renderOption,
  holdingValue,
  onSubmitOptionHolding,
  onChangeHoldingValue,
}: CoinListStorageOptionsProps) => {
  return (
    <Box
      $bgcolor={LIGHTGREY}
      $color={DARKGREY}
      $pv={20}
      $ph={24}
      $br={8}
      $hide={!editMode && options.length === 0}
    >
      {options.map(({total, type}, keyIndex: number) => {
        return (
          <Box key={keyIndex} $mb={12} className="holding">
            <Headline $m={0} $p={0} $pb={12} size="h5">
              <Span tKey={`${HOLDING_TYPES_T_KEY_PATH}.${type}`} />{' '}
              <Span
                tKey="welcome:coinlist.text.totalValue"
                tOptions={{
                  total: formatAmount(total, location),
                }}
              />
            </Headline>
            {options.map((option, index) => renderOption(option, index))}
          </Box>
        );
      })}
      {editMode && (
        <CoinListHoldingForm
          holding={holdingValue}
          submitText="add"
          onChange={(props) => {
            onChangeHoldingValue(props);
          }}
          onSubmit={onSubmitOptionHolding}
        />
      )}
    </Box>
  );
};

export default CoinListStorageOptions;
