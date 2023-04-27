import React, {FC, ReactElement, ReactNode} from 'react';
import {StyledProps} from '../../helpers/createStyledProps';
import Button from '../Button/Button';
import List from '../List/List';
import Span from '../Span/Span';

interface RenderListItemProps {
  item: DataListItem;
  index: number;
}

export type DataListItem = {
  text: string;
  value: string;
};

export interface DataListProps extends StyledProps {
  name?: string;
  items: DataListItem[];
  renderListItem?: ({item, index}: RenderListItemProps) => ReactNode;
}

const renderDefaultListItem = ({item, index}: RenderListItemProps) => {
  return (
    <Span key={index} type="button" className="datalist-item-button">
      {item.text}
    </Span>
  );
};

const DataList = ({
  name = 'standard',
  items,
  renderListItem = renderDefaultListItem,
  ...rest
}: DataListProps) => (
  <List<DataListItem>
    className={`datalist ${name}-datalist`}
    data={items}
    renderItem={renderListItem}
    {...rest}
  />
);

export default DataList;
