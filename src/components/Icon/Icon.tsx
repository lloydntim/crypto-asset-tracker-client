import React from 'react';

import IconView from './IconView';
import IconSwap from './IconSwap';
import IconTick from './IconTick';
import IconForward from './IconForward';
import IconBackward from './IconBackward';
import IconArrowRight from './IconArrowRight';
import IconArrowLeft from './IconArrowLeft';
import IconArrowUp from './IconArrowUp';
import IconArrowDown from './IconArrowDown';
import IconDelete from './IconDelete';
import IconEdit from './IconEdit';
import IconPlus from './IconPlus';
import IconMenu from './IconMenu';
import IconClose from './IconClose';
import IconClipboard from './IconClipboard';
import IconAddList from './IconAddList';
import IconRefresh from './IconRefresh';
import IconHome from './IconHome';
import IconLanguage from './IconLanguage';
import IconSound from './IconSound';
import IconSearch from './IconSearch';
import IconCut from './IconCut';
import IconCopy from './IconCopy';
import IconMove from './IconMove';
import IconLogo from './IconLogo';

export interface IconProps {
  type?: string;
  $w?: number;
  $h?: number;
  $sz?: number;
  $color?: string;
}

const Icon = ({type, $w, $h, $sz, $color}: IconProps) => {
  const dimensions = $sz ? {$sz, $color} : {$h, $w, $color};
  switch (type) {
    case 'view':
      return <IconView />;
    case 'swap':
      return <IconSwap />;
    case 'forward':
      return <IconForward />;
    case 'backward':
      return <IconBackward />;
    case 'tick':
      return <IconTick />;
    case 'arrow-right':
      return <IconArrowRight />;
    case 'arrow-left':
      return <IconArrowLeft />;
    case 'arrow-up':
      return <IconArrowUp {...dimensions} />;
    case 'arrow-down':
      return <IconArrowDown {...dimensions} />;
    case 'delete':
      return <IconDelete {...dimensions} />;
    case 'edit':
      return <IconEdit {...dimensions} />;
    case 'plus':
      return <IconPlus {...dimensions} />;
    case 'logo':
      return <IconLogo {...dimensions} />;
    case 'menu':
      return <IconMenu />;
    case 'close':
      return <IconClose {...dimensions} />;
    case 'clipboard':
      return <IconClipboard />;
    case 'cut':
      return <IconCut />;
    case 'move':
      return <IconMove />;
    case 'copy':
      return <IconCopy />;
    case 'add-list':
      return <IconAddList />;
    case 'refresh':
      return <IconRefresh />;
    case 'home':
      return <IconHome />;
    case 'language':
      return <IconLanguage />;
    case 'sound':
      return <IconSound />;
    case 'search':
      return <IconSearch />;
    default:
      return null;
  }
};

export default Icon;
