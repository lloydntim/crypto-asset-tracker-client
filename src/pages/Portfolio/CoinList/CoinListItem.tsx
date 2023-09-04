import React, {ReactNode, useState} from 'react';
import {
  Box,
  Button,
  IconButton,
  Image,
  Message,
  Text,
} from '../../../components';
import Table, {TableCell, TableRow} from '../../../components/Table';
import {TRANSPARENT, WHITE} from '../../../constants/colors';
import {formatToCurrency} from '../../../utils';
import {
  Coin,
  Currency,
  coinListDialogMapper,
  formatAmount,
} from './CoinListHelper';
import {GET_COIN_LIST, REMOVE_COIN} from '../../../graphql/operations';
import {InMemoryCache, useMutation} from '@apollo/client';
import {displayResponseErrorMessage} from '../../../helpers/displayResponseErrorMessage';
import {Dialog} from '../../../layouts';
import {useAuthentication} from '../../../providers/AuthenticationProvider';

interface CoinListItemProps extends Coin {
  currency: Currency;
  location: string;
  editMode: boolean;
  onClick: () => void;
  children: ReactNode;
}

const CoinListItem = ({
  editMode,
  value,
  coinId,
  name,
  id,
  total: coinTotal,
  location,
  currency,
  price,
  children,
  onClick,
}: CoinListItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const [dialog, setDialog] = useState(false);
  const {currentUser} = useAuthentication();
  const creatorId = currentUser().id;
  const getCoinListQueryVariables = {creatorId, convert: currency};
  const cacheQueryParams = {
    query: GET_COIN_LIST,
    variables: getCoinListQueryVariables,
  };

  const [removeCoin, {loading, error}] = useMutation(REMOVE_COIN, {
    update: (cache: InMemoryCache, {data}: any) => {
      if (!data) return;

      const removedCoin = data.removeCoin;
      const existingCoins: any = cache.readQuery(cacheQueryParams);
      const {balance, coins} = existingCoins.getCoinList;

      cache.writeQuery({
        ...cacheQueryParams,
        data: {
          getCoinList: {
            balance,
            coins: coins.filter((coin: any) => coin.id !== removedCoin.id),
          },
        },
      });
    },
  });

  const removeCoinHandler = () => {
    setDialog(false);
    removeCoin({variables: {id}});
  };

  return (
    <>
      <Dialog
        titleTKey={coinListDialogMapper.removeCoin.titleTKey}
        visible={dialog}
        onCancelButtonClick={() => setDialog(false)}
        onContinueButtonClick={removeCoinHandler}
      >
        <Text tKey={coinListDialogMapper.removeCoin.messageTKey} />
      </Dialog>
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
          onClick={() => setExpanded(!expanded)}
        >
          <Table>
            <TableRow>
              <TableCell $valign-m $col-w={40}>
                <Image
                  $flex-row
                  $sz={24}
                  $mr={8}
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`}
                />
              </TableCell>
              <TableCell $valign-m $col-w={140} $txt-align-l>
                {name}
              </TableCell>
              <TableCell $valign-m $col-w={120} $txt-align-r>
                {formatToCurrency(price, currency, location)}
              </TableCell>
              <TableCell $valign-m $col-w={160} $txt-align-r>
                {formatAmount(coinTotal, location)}
              </TableCell>
              <TableCell $valign-m $ph={12} $col-w={120} $txt-align-r>
                {formatToCurrency(value, currency, location)}
              </TableCell>
            </TableRow>
          </Table>
        </Button>
        {editMode && (
          <IconButton
            $mh={8}
            type="delete"
            iconSize={16}
            onClick={() => setDialog(true)}
          />
        )}
      </Box>
      {expanded && children}
      {displayResponseErrorMessage(error)}
      {loading && <Message type="info" tKey="common:message.loading.text" />}
    </>
  );
};

export default CoinListItem;
