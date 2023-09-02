import React from 'react';
import {Box, Button, Container, Select, Text} from '../../../components';
import {Currency, currenciesOptions} from './CoinListHelper';
import {BLACK, GRAPE_EXTRA_DARK, WHITE} from '../../../constants/colors';
import {formatToCurrency} from '../../../utils';

interface CoinListHeaderProps {
  balance: number;
  editMode: boolean;
  location: string;
  currency: Currency;
  onChangeCurrency: (value: string) => void;
  onToggleEditMode: (editMode: boolean) => void;
}

const CoinListHeader = ({
  balance,
  editMode,
  onChangeCurrency,
  currency,
  location,
  onToggleEditMode,
}: CoinListHeaderProps) => {
  return (
    <>
      <Box $flex-row $mv={12}>
        <Button
          $mr={12}
          $color={GRAPE_EXTRA_DARK}
          onClick={() => onToggleEditMode(!editMode)}
          tKey={`common:button.${editMode ? 'save' : 'edit'}`}
        />
        <Select options={currenciesOptions} onChange={onChangeCurrency} />
      </Box>

      <Container
        $bgcolor={WHITE}
        $color={BLACK}
        $br={8}
        $p={20}
        $mv={4}
        $flex-h
        $spc-btw
      >
        <Text strong tKey="portfolio:coinlist.text.myPortfolio" />
        <Text
          tKey="portfolio:coinlist.text.portfolioTotal"
          tOptions={{
            total: formatToCurrency(balance, currency, location),
          }}
        />
      </Container>
    </>
  );
};

export default CoinListHeader;
