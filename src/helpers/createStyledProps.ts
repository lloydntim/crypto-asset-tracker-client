import styled from 'styled-components';

export interface StyledProps {
  w?: number | string;
  h?: number | string;

  ['max-h']?: number | string;
  ['max-w']?: number | string;
  ['min-h']?: number | string;
  ['min-w']?: number | string;

  sz?: number | string;
  br?: number;

  p?: number | string;
  ph?: number | string;
  pv?: number | string;
  m?: number | string;
  mh?: number | string;
  mv?: number | string;

  color?: number | string;
  bgcolor?: number | string;
  opacity?: number | string;

  cover?: boolean;
  crop?: boolean;

  ['pos-abs']?: boolean;
  ['pos-rel']?: boolean;

  flex?: string;

  ['flex-col']?: boolean;
  ['flex-row']?: boolean;
  ['flex-col-r']?: boolean;
  ['flex-row-r']?: boolean;

  ['spc-btw']?: boolean;
  ['spc-arnd']?: boolean;

  ['align-l']?: boolean;
  ['align-r']?: boolean;
  ['align-c']?: boolean;

  ['align-t']?: boolean;
  ['align-b']?: boolean;
  ['align-m']?: boolean;
}

export const getUnit = (value: string | number) =>
  value ? (value.toString().includes('%') ? value : `${value}px`) : 0;

const createStylesProps = (
  element: 'div' | 'button' | 'span' | 'section' | 'p' | 'a' | 'input',
) => styled(element)`
    ${({sz}: StyledProps) =>
      sz && `width: ${getUnit(sz)}; height: ${getUnit(sz)};`}
    ${({w}: StyledProps) => w && `width: ${getUnit(w)};`}
    ${(props: StyledProps) =>
      props['max-h'] && `height: ${getUnit(props['max-h'])};`}
    ${(props: StyledProps) =>
      props['max-w'] && `height: ${getUnit(props['max-w'])};`}
    ${(props: StyledProps) =>
      props['min-h'] && `height: ${getUnit(props['min-h'])};`}
    ${(props: StyledProps) =>
      props['min-w'] && `height: ${getUnit(props['min-w'])};`}

    ${({h}) => h && `height: ${getUnit(h)};`}

    ${({br}: StyledProps) => br && `border-radius: ${getUnit(br)};`}

    ${({p}: StyledProps) => p && `padding: ${getUnit(p)};`}
    ${({ph}: StyledProps) =>
      ph && `padding-left: ${getUnit(ph)}; padding-right: ${getUnit(ph)};`}
    ${({pv}: StyledProps) =>
      pv && `padding-top: ${pv}px; padding-bottom: ${getUnit(pv)};`}
    ${({m}: StyledProps) => m && `margin: ${getUnit(m)};`}

    ${({mh}: StyledProps) =>
      mh && `margin-left: ${getUnit(mh)}; margin-right: ${getUnit(mh)};`}
    ${({mv}: StyledProps) =>
      mv && `margin-top: ${getUnit(mv)}; margin-bottom: ${getUnit(mv)};`}

    ${({color}: StyledProps) => color && `color: ${color};`}
    ${({bgcolor}: StyledProps) => bgcolor && `background-color: ${bgcolor};`}
    ${({opacity}: StyledProps) => opacity && `opacity: ${opacity};`}

    ${({cover}: StyledProps) => cover && 'overflow: hidden;'}
    ${({crop}: StyledProps) => crop && 'width: 100%; height: 100%;'}

    ${(props: StyledProps) => props['pos-abs'] && 'position: absolute;'}
    ${(props: StyledProps) => props['pos-rel'] && 'position: relative;'}

    ${({flex}: StyledProps) => flex && `flex: ${flex};`}
    ${(props: StyledProps) =>
      props['flex-col'] && 'display: flex; flex-direction: column;'}
    ${(props: StyledProps) =>
      props['flex-row'] && 'display: flex; flex-direction: row;'}
    ${(props: StyledProps) =>
      props['flex-col-r'] && 'display: flex; flex-direction: column-reverse;'}
    ${(props: StyledProps) =>
      props['flex-row-r'] && 'display: flex; flex-direction: row-reverse;'}

    ${(props: StyledProps) =>
      props['spc-btw'] && 'display: flex; justify-content: space-between;'}
    ${(props: StyledProps) =>
      props['spc-arnd'] && 'display: flex; justify-content: space-around;'}

    ${(props: StyledProps) => props['align-r'] && 'align-items: flex-start;'}

    ${(props: StyledProps) => props['align-t'] && 'align-items: flex-start;'}
    ${(props: StyledProps) => props['align-m'] && 'align-items: center;'}
    ${(props: StyledProps) => props['align-b'] && 'align-items: flex-end;'}

    ${(props: StyledProps) =>
      props['align-l'] && 'justify-content: flex-start;'}
    ${(props: StyledProps) => props['align-c'] && 'justify-content: center;'}
    ${(props: StyledProps) => props['align-r'] && 'justify-content: flex-end;'}

`;

export default createStylesProps;
