import React, {ReactNode} from 'react';
import {Box, Headline, Span, Text} from '../../../components';
import {
  HOLDING_TYPES_T_KEY_PATH,
  Holding,
  HoldingStorage,
  formatAmount,
} from './CoinListHelper';
import {DARKGREY, LIGHTGREY} from '../../../constants/colors';
import {StyledProps} from '../../../helpers';

interface CoinListHoldingStorageProps extends HoldingStorage {
  location: string;
  renderHolding: (item: Holding, index: number) => ReactNode;
}

export const CoinListHoldingStorage = ({
  holdings,
  type,
  total,
  location,
  renderHolding,
}: CoinListHoldingStorageProps) => {
  return (
    <Box $mb={12} className="holding">
      <Headline $m={0} $p={0} $pb={12} size="h5">
        <Span tKey={`${HOLDING_TYPES_T_KEY_PATH}.${type}`} />
        <Span
          tKey="portfolio:coinlist.text.totalValue"
          tOptions={{
            total: formatAmount(total, location),
          }}
        />
      </Headline>
      <Box $crop-x-scrl>
        {holdings.map((holding, index) => renderHolding(holding, index))}
      </Box>
    </Box>
  );
};

interface CoinListHoldingStoragesProps extends StyledProps {
  storages: HoldingStorage[];
  renderStorage: (item: HoldingStorage, index: number) => ReactNode;
}

const CoinListHoldingStorages = ({
  storages,
  renderStorage,
}: CoinListHoldingStoragesProps) => {
  return (
    <Box
      $bgcolor={LIGHTGREY}
      $color={DARKGREY}
      $pv={20}
      $ph={20}
      $mv={4}
      $br={8}
    >
      {storages.length ? (
        <>{storages.map((storage, index) => renderStorage(storage, index))}</>
      ) : (
        <Text
          $flex-row
          $align-c
          $m={0}
          tKey="portfolio:coinlist.text.emptyList"
        />
      )}
    </Box>
  );
};

export default CoinListHoldingStorages;
