import styled from 'styled-components';

const Container = styled.div<{
    w?: number | string;
    br?: number;
    color?: number | string;
    p?: number | string;
    ph?: number | string;
    pv?: number | string;
    m?: number | string;
    mh?: number | string;
    mv?: number | string;
    ['flex-h']?: boolean;
    ['flex-v']?: boolean;
    ['spc-btw']?: boolean;
    ['spc-arnd']?: boolean;
}>`
    width:  ${({w}) => w || 780}px;
    border-radius: ${({br}) => br || 8}px;
    background-color: ${({color}) => color || 'transparent'};
    ${({p}) => p && `padding: ${p}px;`}
    ${({ph}) => ph && `padding: 0 ${ph}px;`}
    ${({pv}) => pv && `padding: ${pv}px 0;`}
    ${({m}) => m && `margin: ${m}px;`}
    ${({mh}) => mh && `margin: 0 ${mh}px;`}
    ${({mv}) => mv && `margin: ${mv}px 0;`}
    ${(props) => props['flex-v'] && 'display: flex; flex-direction: column;'}
    ${(props) => props['flex-h'] && 'display: flex; flex-direction: row;'}
    ${(props) =>
        props['spc-btw'] && 'display: flex; justify-content: space-between;'}
    ${(props) =>
        props['spc-arnd'] && 'display: flex; justify-content: space-around;'}
`;

export default Container;
