import React, { FC, ReactElement, useState } from 'react';

import { Header, Body, Footer, Text } from '../../components';
import { Page } from '../../layouts';
import { useClipboard, ClipboardData } from '../../providers/ClipboardProvider';

const Welcome: FC = (): ReactElement => {
  const [list, setList] = useState([
    'apples',
    'oranges',
    'carots',
  ]);
  const clipboard = useClipboard();

  return (
    <Page name="welcome">
      <Header title="Welcome" />
      <Body>
        <Text i18n='testKey' />
        <br />
        <Text type="dd">Welcome Page</Text>
        <br />
        <ul>
          {list
            .map((item: string, index: number) => (
              <li key={index}>
                <span>{item}</span>
                <button
                  onClick={
                    () => clipboard.add({ list: [item] })
                  }
                >copy</button>
              </li>
            ))}
        </ul>
        <br />
        <button onClick={() => {
          const pasted: ClipboardData<string> = clipboard.get();
          const newList = [...pasted.list, ...list];
          setList(newList);
        }}>paste</button>
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Welcome;
