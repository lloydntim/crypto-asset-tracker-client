import styled from 'styled-components';
import {getUnit} from '../../helpers/createStyledProps';
import Box from '../Box/Box';

interface TableCellProps {
  ['valign-t']?: boolean;
  ['valign-m']?: boolean;
  ['valign-b']?: boolean;

  ['txt-align-l']?: boolean;
  ['txt-align-c']?: boolean;
  ['txt-align-r']?: boolean;

  ['col-w']?: string | number;
}

export const TableRow = styled(Box)`
  display: table-row;
`;

export const TableCell = styled(Box)`
    display: table-cell;
   ${(props: TableCellProps) => props['valign-t'] && `vertical-align: top;`}
   ${(props: TableCellProps) => props['valign-m'] && `vertical-align: middle;`}
   ${(props: TableCellProps) => props['valign-b'] && `vertical-align: bottom;`}
   ${(props: TableCellProps) => props['txt-align-l'] && `text-align: left;`}
   ${(props: TableCellProps) => props['txt-align-c'] && `text-align: center;`}
   ${(props: TableCellProps) => props['txt-align-r'] && `text-align: right;`}
   ${(props: TableCellProps) =>
     props['col-w'] && `column-width: ${getUnit(props['col-w'])};`}
`;

const Table = styled(Box)`
  display: table;
`;

export default Table;
