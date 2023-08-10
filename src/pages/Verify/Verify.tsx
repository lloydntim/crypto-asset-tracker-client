import React, {useEffect} from 'react';
import {Page} from '../../layouts';
import {Text, Header, Body, Footer, Headline, Message} from '../../components';
import {useMutation} from '@apollo/client';
import {VERIFY} from '../../graphql';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {useNavigate, useParams} from 'react-router-dom';

const Verify = () => {
  const navigate = useNavigate();
  const {token} = useParams();
  const {setLoginToken, currentUser} = useAuthentication();
  const [verify, {loading, error}] = useMutation(VERIFY, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      /* eslint-disable no-undef */
      if (data.verify) {
        setLoginToken(data.verify.token as string);
        navigate('/profile');
      }
    },
  });

  useEffect(() => {
    verify({variables: {token}});
  }, [token, verify]);

  return (
    <Page name="verify">
      <Header />
      <Body flex-col align-c flex="1">
        <Headline tKey="verify:title" />

        {loading && (
          <Message type="info">
            <Text tKey="common:message.loading.text" />
          </Message>
        )}
        {error && <Message type="error">{error.message}</Message>}
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Verify;
