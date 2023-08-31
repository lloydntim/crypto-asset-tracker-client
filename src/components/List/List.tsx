import React, {ReactNode} from 'react';
import createStylesProps, {StyledProps} from '../../helpers/createStyledProps';

const ListSt = createStylesProps('ul');
const ListItemSt = createStylesProps('li');

export interface RenderItemProps<T> {
  item: T;
  index: number;
}

export type RenderItem<T> = (props: RenderItemProps<T>) => ReactNode;
interface ListProps<ItemType> extends StyledProps {
  className?: string;
  data: ItemType[];
  renderItem: RenderItem<ItemType>;
}

const List = <T,>({data, renderItem, ...rest}: ListProps<T>) => (
  <ListSt role="list" {...rest}>
    {data.map((item, index) => (
      <ListItemSt $flex-col role="listitem" key={index}>
        {renderItem({item, index})}
      </ListItemSt>
    ))}
  </ListSt>
);

export default List;
