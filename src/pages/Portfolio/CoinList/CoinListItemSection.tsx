import React, {ReactNode} from 'react';
import {Box, Button, IconButton, Image} from '../../../components';
import Table, {TableCell, TableRow} from '../../../components/Table';
import {TRANSPARENT, WHITE} from '../../../constants/colors';
import {formatToCurrency} from '../../../utils';
import {Currency, formatAmount} from './CoinListHelper';

interface CoinListItemSectionProps {
  price: number;
  value: number;
  total: number;
  name: string;
  convert: Currency;
  coinId: string;
  location: string;
  editMode: boolean;
  deleteButtonClickHandler: () => void;
  onClick: () => void;
}

const CoinListItemSection = ({
  editMode,
  value,
  coinId,
  name,
  total: coinTotal,
  location,
  convert,
  price,
  onClick,
  deleteButtonClickHandler,
}: CoinListItemSectionProps) => {
  return (
    <Box
      className="coin-list-item"
      $flex-row
      $bgcolor={WHITE}
      $pv={16}
      $ph={16}
      $br={8}
      $mv={4}
    >
      <Button
        $bgcolor={TRANSPARENT}
        $bw={0}
        $m={0}
        $pv={0}
        $ph={0}
        onClick={onClick}
      >
        <Table>
          <TableRow>
            <TableCell $valign-m $col-w={40}>
              <Image
                $flex-row
                $sz={24}
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`}
              />
            </TableCell>
            <TableCell $valign-m $col-w={140} $txt-align-l>
              {name}
            </TableCell>
            <TableCell $valign-m $col-w={120} $txt-align-r>
              {formatToCurrency(price, convert, location)}
            </TableCell>
            <TableCell $valign-m $col-w={160} $txt-align-r>
              {formatAmount(coinTotal, location)}
            </TableCell>
            <TableCell $valign-m $ph={12} $col-w={120} $txt-align-r>
              {formatToCurrency(value, convert, location)}
            </TableCell>
          </TableRow>
        </Table>
      </Button>
      {editMode && (
        <IconButton
          $mh={8}
          type="delete"
          iconSize={16}
          onClick={deleteButtonClickHandler}
        />
      )}
    </Box>
  );
};

export default CoinListItemSection;
