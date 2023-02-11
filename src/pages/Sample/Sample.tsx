import React, {FC, ReactElement, useState} from 'react';
import {Header, Body, Text, Headline, Footer} from '../../components';
import {Page, Overlay} from '../../layouts';
import {useClipboard, ClipboardData} from '../../providers/ClipboardProvider';

const Sample: FC = (): ReactElement => {
  const [list, setList] = useState(['apples', 'oranges', 'carots']);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const clipboard = useClipboard();

  return (
    <Page name="sample">
      <Header />
      <Body>
        <Headline tKey="sample:title" />

        <Text tKey="sample text" />
        <br />
        <Text tKey="testKey" />
        <br />
        <Text>Sample Page</Text>
        <br />
        <ul>
          {list.map((item: string, index: number) => (
            <li key={index}>
              <span>{item}</span>
              <button onClick={() => clipboard.add({list: [item]})}>
                copy
              </button>
            </li>
          ))}
        </ul>
        <br />
        <button
          onClick={() => {
            const pasted: ClipboardData<string> = clipboard.get();
            const newList = [...pasted.list, ...list];
            setList(newList);
          }}
        >
          paste
        </button>

        <button onClick={() => setIsOverlayVisible(true)}>Show Overlay</button>
      </Body>
      <Overlay
        title="Random Overlay"
        onCloseButtonClick={() => setIsOverlayVisible(false)}
        visible={isOverlayVisible}
      >
        This is just a random Overlay.
      </Overlay>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Sample;
