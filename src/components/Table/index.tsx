import styled from 'styled-components';
import {getUnit} from '../../helpers/createStyledProps';
import Box from '../Box/Box';

interface TableCellProps {
  '$valign-t'?: boolean;
  '$valign-m'?: boolean;
  '$valign-b'?: boolean;

  '$txt-align-l'?: boolean;
  '$txt-align-c'?: boolean;
  '$txt-align-r'?: boolean;

  '$col-w'?: string | number;
}

export const TableRow = styled(Box)`
  display: table-row;
`;

/* export const TableCell = styled(Box)<TableCellProps>`
  display: table-cell;
  ${(props) => props['valign-t'] && `vertical-align: top;`}
  ${(props) => props['valign-m'] && `vertical-align: middle;`}
   ${(props) => props['valign-b'] && `vertical-align: bottom;`}
   ${(props) => props['txt-align-l'] && `text-align: left;`}
   ${(props) => props['txt-align-c'] && `text-align: center;`}
   ${(props) => props['txt-align-r'] && `text-align: right;`}
   ${(props) =>
    props['col-w'] && `column-width: ${getUnit(props['col-w'])};`}
`;
 */

export const TableCell = styled(Box).attrs((props: TableCellProps) => ({
  display: 'table-cell',
  ...(props['$valign-t'] && {'vertical-align': 'top'}),
  ...(props['$valign-m'] && {'vertical-align': 'middle'}),
  ...(props['$valign-b'] && {'vertical-align': 'bottom'}),
  ...(props['$txt-align-l'] && {'text-align': 'left'}),
  ...(props['$txt-align-c'] && {'text-align': 'center'}),
  ...(props['$txt-align-r'] && {'text-align': 'right'}),
  ...(props['$col-w'] && {'column-width': getUnit(props['$col-w'])}),
}))``;

const Table = styled(Box)`
  display: table;
`;

export default Table;
