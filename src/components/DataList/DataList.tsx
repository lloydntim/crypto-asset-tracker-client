import React, { FC, ReactElement } from 'react';

import './DataList.scss';

export type DataListItemType = {
  text: string;
  value: number | string;
}

export interface DataListItemProps {
  item: DataListItemType;
  onListItemClick?: (item: DataListItemType) => void
}

export interface DataListProps {
  name?: string;
  items: DataListItemType[];
  renderListItem?: FC<DataListItemProps>;
  onListItemClick?: (item: DataListItemType) => void
}

const renderDefaultListItem: FC<DataListItemProps> = ({ item, onListItemClick }): ReactElement => (
  <button
    type="button"
    className="datalist-item-button"
    onClick={() => onListItemClick(item)}
  >
    {item.text}
  </button>
);

const DataList: FC<DataListProps> = ({
  name = 'standard',
  items,
  renderListItem = renderDefaultListItem,
  onListItemClick,
}) => (
  <ul className={`datalist ${name}-datalist`}>
    {
      items.map((item, index) => (
        <li key={index} className="datalist-item">
          {renderListItem({ item, onListItemClick })}
        </li>
      ))
    }
  </ul>
);

export default DataList;
