import React, {ReactNode} from 'react';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';

const ListSt = createStylesProps('ul');

const ListItemSt = createStylesProps('li');
interface ListProps<ItemType> extends StyledProps {
  className?: string;
  data: ItemType[];
  renderItem: ({item, index}: {item: ItemType; index: number}) => ReactNode;
}

const List = <T,>({data, renderItem, ...rest}: ListProps<T>) => (
  <ListSt {...rest}>
    {data.map((item, index) => (
      <ListItemSt key={index}>{renderItem({item, index})}</ListItemSt>
    ))}
  </ListSt>
);

export default List;
