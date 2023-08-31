import React, {Children, PropsWithChildren, ReactNode, useState} from 'react';

import Box from '../../components/Box/Box';
import Button from '../../components/Button/Button';
import {GRAPE_DARK, GREY, TRANSPARENT} from '../../constants/colors';

interface TabsProps {
  titles: string[];
  onTabClick?: (index: number) => void;
}

const createTabs = (children: ReactNode, selectedTab: number) =>
  Children.map(children, (child: ReactNode, index: number) => {
    return selectedTab === index && <Box className="tab-content">{child}</Box>;
  });

const Tabs = ({children, titles, onTabClick}: PropsWithChildren<TabsProps>) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = createTabs(children, selectedTab);

  return (
    <Box $w="100%" className="tabs">
      <Box $w="100%" $ml={8} className="tab-titles">
        {titles.map((title, index) => {
          const isSelected = selectedTab === index;
          return (
            <Button
              key={index}
              $bgcolor={TRANSPARENT}
              $bw={0}
              $color={isSelected ? GRAPE_DARK : GREY}
              $pv={8}
              $ph={16}
              $pos-rel
              $pos-l={12}
              className={`tab-title ${isSelected && 'is-selected'}`}
              onClick={() => {
                setSelectedTab(index);
                if (!isSelected && onTabClick) onTabClick(index);
              }}
            >
              {title}
            </Button>
          );
        })}
      </Box>
      {tabs}
    </Box>
  );
};

export default Tabs;
