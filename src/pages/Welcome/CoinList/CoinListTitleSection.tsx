import React, {ReactNode} from 'react';
import {Box, Button, Container, Select, Text} from '../../../components';
import {CoinListProps, CurrencyOption, StorageOption} from './CoinListHelper';
import {BLACK, GRAPE_EXTRA_DARK, WHITE} from '../../../constants/colors';
import {formatToCurrency} from '../../../utils';

interface CoinListTitleSectionProps
  extends Pick<CoinListProps, 'onChangeCurrency' | 'convert'> {
  balance: number;
  editMode: boolean;
  location: string;
  onToggleEditMode: (editMode: boolean) => void;
  currenciesOptions: CurrencyOption[];
}

const CoinListTitleSection = ({
  balance,
  editMode,
  currenciesOptions,
  onChangeCurrency,
  convert,
  location,
  onToggleEditMode,
}: CoinListTitleSectionProps) => {
  return (
    <>
      <Box $flex-row $mv={12}>
        <Button
          $mr={12}
          $color={GRAPE_EXTRA_DARK}
          onClick={() => {
            onToggleEditMode(!editMode);
          }}
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
        <Text strong tKey="welcome:coinlist.text.myPortfolio" />{' '}
        <Text
          tKey="welcome:coinlist.text.portfolioTotal"
          tOptions={{
            total: formatToCurrency(balance, convert, location),
          }}
        />
      </Container>
    </>
  );
};

export default CoinListTitleSection;
