import {type ComponentType} from 'react';
import styled from 'styled-components';

export interface StyledProps {
  w?: number | string | undefined;
  h?: number | string | undefined;

  'max-h'?: number | string | undefined;
  'max-w'?: number | string | undefined;
  'min-h'?: number | string | undefined;
  'min-w'?: number | string | undefined;

  sz?: number | string | undefined;
  br?: number | undefined;

  'br-tl'?: number | undefined;
  'br-tr'?: number | undefined;
  'br-bl'?: number | undefined;
  'br-br'?: number | undefined;

  bcolor?: number | string | undefined;
  bw?: number | string | undefined;
  bs?: number | string | undefined;

  p?: number | string | undefined;
  ph?: number | string | undefined;
  pv?: number | string | undefined;
  pt?: number | string | undefined;
  pb?: number | string | undefined;
  pl?: number | string | undefined;
  pr?: number | string | undefined;
  m?: number | string | undefined;
  mh?: number | string | undefined;
  mv?: number | string | undefined;
  mt?: number | string | undefined;
  mb?: number | string | undefined;
  ml?: number | string | undefined;
  mr?: number | string | undefined;

  color?: number | string | undefined;
  bgcolor?: number | string | undefined;
  opacity?: number | string | undefined;

  cover?: boolean | undefined;
  crop?: boolean | undefined;
  hide?: boolean | undefined;
  hidden?: boolean | undefined;

  'z-idx'?: number | undefined;

  'pos-abs'?: boolean | undefined;
  'pos-rel'?: boolean | undefined;
  'pos-fix'?: boolean | undefined;

  'pos-t'?: number | string | undefined;
  'pos-r'?: number | string | undefined;
  'pos-b'?: number | string | undefined;
  'pos-l'?: number | string | undefined;

  flex?: string | undefined;

  'flex-col'?: boolean | undefined;
  'flex-row'?: boolean | undefined;
  'flex-col-r'?: boolean | undefined;
  'flex-row-r'?: boolean | undefined;

  'spc-btw'?: boolean | undefined;
  'spc-arnd'?: boolean | undefined;

  'align-l'?: boolean | undefined;
  'align-r'?: boolean | undefined;
  'align-c'?: boolean | undefined;

  'align-t'?: boolean | undefined;
  'align-b'?: boolean | undefined;
  'align-m'?: boolean | undefined;

  'align-str'?: boolean | undefined;

  'align-self-l'?: boolean | undefined;
  'align-self-r'?: boolean | undefined;
  'align-self-c'?: boolean | undefined;

  'font-sz'?: string | number | undefined;
  'font-wgt'?: string | number | undefined;

  animation?: string;
  'crsr-pointer'?: boolean | undefined;

  'txt-deco'?: string | undefined;
  'lst-stl'?: string | undefined;
}

export const isDefined = (prop: unknown) => typeof prop !== 'undefined';

export const getUnit = (value: string | number | undefined) =>
  value ? (typeof value === 'string' ? value : `${value}px`) : 0;

/* eslint-disable @typescript-eslint/no-explicit-any */
const createStylesProps = <T extends ComponentType>(
  element:
    | T
    // | any
    | 'aside'
    | 'nav'
    | 'header'
    | 'footer'
    | 'div'
    | 'button'
    | 'span'
    | 'section'
    | 'p'
    | 'a'
    | 'ul'
    | 'li'
    | 'input'
    | 'img'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'label'
    | 'form',
) => {
  // if (typeof element === 'undefined') return null;

  return styled(element)<StyledProps>`
    ${({sz}: StyledProps) =>
      sz && `width: ${getUnit(sz)}; height: ${getUnit(sz)};`}

    ${({h}: StyledProps) => h && `height: ${getUnit(h)};`}
    ${({w}: StyledProps) => w && `width: ${getUnit(w)};`}

    ${(props: StyledProps) =>
      props['max-h'] && `max-height: ${getUnit(props['max-h'])};`}
    ${(props: StyledProps) =>
      props['max-w'] && `max-width: ${getUnit(props['max-w'])};`}
    ${(props: StyledProps) =>
      props['min-h'] && `height: ${getUnit(props['min-h'])};`}
    ${(props: StyledProps) =>
      props['min-w'] && `height: ${getUnit(props['min-w'])};`}

    ${({br}: StyledProps) => `border-radius: ${getUnit(br)};`}
    ${(props: StyledProps) =>
      isDefined(props['br-tl']) &&
      `border-top-left-radius: ${getUnit(props['br-tl'])};`}
    ${(props: StyledProps) =>
      isDefined(props['br-tr']) &&
      `border-top-right-radius: ${getUnit(props['br-tr'])};`}
    ${(props: StyledProps) =>
      isDefined(props['br-bl']) &&
      `border-bottom-left-radius: ${getUnit(props['br-bl'])};`}
    ${(props: StyledProps) =>
      isDefined(props['br-br']) &&
      `border-bottom-right-radius: ${getUnit(props['br-br'])};`}
    ${({bcolor}: StyledProps) => bcolor && `border-color: ${bcolor};`}
    ${({bw}: StyledProps) => isDefined(bw) && `border-width: ${getUnit(bw)};`}
    ${({bs}: StyledProps) => isDefined(bs) && `border-style: ${bs ?? 'solid'};`}

    ${({p}: StyledProps) => isDefined(p) && `padding: ${getUnit(p)};`}
    ${({ph}: StyledProps) =>
      isDefined(ph) &&
      `padding-left: ${getUnit(ph)}; padding-right: ${getUnit(ph)};`}
    ${({pv}: StyledProps) =>
      isDefined(pv) &&
      `padding-top: ${getUnit(pv)}; padding-bottom: ${getUnit(pv)};`}
    ${({pt}: StyledProps) => isDefined(pt) && `padding-top: ${getUnit(pt)};`}
    ${({pb}: StyledProps) => isDefined(pb) && `padding-bottom: ${getUnit(pb)};`}
    ${({pl}: StyledProps) => isDefined(pl) && `padding-left: ${getUnit(pl)};`}
    ${({pr}: StyledProps) => isDefined(pr) && `padding-right: ${getUnit(pr)};`}

    ${({m}: StyledProps) => isDefined(m) && `margin: ${getUnit(m)};`}
    ${({mh}: StyledProps) =>
      isDefined(mh) &&
      `margin-left: ${getUnit(mh)}; margin-right: ${getUnit(mh)};`}
    ${({mv}: StyledProps) =>
      isDefined(mv) &&
      `margin-top: ${getUnit(mv)}; margin-bottom: ${getUnit(mv)};`}

    ${({mt}: StyledProps) => isDefined(mt) && `margin-top: ${getUnit(mt)};`}
    ${({mb}: StyledProps) => isDefined(mb) && `margin-bottom: ${getUnit(mb)};`}
    ${({ml}: StyledProps) => isDefined(ml) && `margin-left: ${getUnit(ml)};`}
    ${({mr}: StyledProps) => isDefined(mr) && `margin-right: ${getUnit(mr)};`}


    ${({color}: StyledProps) => color && `color: ${color};`}
    ${({bgcolor}: StyledProps) => bgcolor && `background-color: ${bgcolor};`}
    ${({opacity}: StyledProps) => opacity && `opacity: ${opacity};`}

    ${({crop}: StyledProps) => crop && 'overflow: hidden;'}
    ${({cover}: StyledProps) => cover && 'width: 100%; height: 100%;'}
    ${({hide}: StyledProps) => hide && 'display: none;'}
    ${({hidden}: StyledProps) => hidden && 'visibility: hidden;'}

    ${(props: StyledProps) =>
      isDefined(props['z-idx']) && `z-index: ${props['z-idx'] ?? 0};`}

    ${(props: StyledProps) => props['pos-abs'] && 'position: absolute;'}
    ${(props: StyledProps) => props['pos-rel'] && 'position: relative;'}
    ${(props: StyledProps) => props['pos-fix'] && 'position: fixed;'}

     ${(props: StyledProps) =>
      isDefined(props['pos-t']) && `top: ${getUnit(props['pos-t'])};`}
    ${(props: StyledProps) =>
      isDefined(props['pos-r']) && `right: ${getUnit(props['pos-r'])};`}
    ${(props: StyledProps) =>
      isDefined(props['pos-b']) && `bottom: ${getUnit(props['pos-b'])};`}
    ${(props: StyledProps) =>
      isDefined(props['pos-l']) && `left: ${getUnit(props['pos-l'])};`}

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

    ${(props: StyledProps) => props['align-str'] && 'align-items: stretch;'}

    ${(props: StyledProps) =>
      props['align-l'] && 'justify-content: flex-start;'}
    ${(props: StyledProps) => props['align-c'] && 'justify-content: center;'}
    ${(props: StyledProps) => props['align-r'] && 'justify-content: flex-end;'}

    ${(props: StyledProps) =>
      props['align-self-l'] && 'align-self: flex-start;'}
    ${(props: StyledProps) => props['align-self-c'] && 'align-self: center;'}
    ${(props: StyledProps) => props['align-self-r'] && 'align-self: flex-end;'}

    ${(props: StyledProps) =>
      props['font-sz'] && `font-size: ${getUnit(props['font-sz'])};`}
      ${(props: StyledProps) =>
      props['font-wgt'] && `font-weight: ${props['font-wgt']};`}

    ${({animation}: StyledProps) => animation && `transition: ${animation};`}
    ${(props: StyledProps) => props['crsr-pointer'] && 'cursor: pointer;'}
    ${(props: StyledProps) =>
      props['lst-stl'] && `list-style: ${props['lst-stl']};`}
    ${(props: StyledProps) =>
      props['txt-deco'] && `text-decoration: ${props['txt-deco']};`}
  `;
};
export interface StyledTextProps {
  color?: number | string | undefined;
}

export const createTextStylesProps = (element: 'p' | 'h5') => {
  return styled(element)`
    ${({color}: StyledTextProps) => color && `color: ${color};`}
  `;
};

export default createStylesProps;
