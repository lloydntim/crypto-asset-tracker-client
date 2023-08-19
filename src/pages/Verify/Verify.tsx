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
  const {setLoginToken} = useAuthentication();
  const [verify, {loading, error}] = useMutation(VERIFY, {
    onCompleted: (data) => {
      /* eslint-disable no-undef */
      if (data.verify) {
        setLoginToken(data.verify.token as string);
        navigate('/profile');
      }
    },
  });

  useEffect(() => {
    console.log('test');
    verify({variables: {token}}).catch((error) => {
      navigate('/');
      console.log(error);
    });
  }, [token, verify, navigate]);

  return (
    <Page name="verify">
      <Header />
      <Body flex-col align-c flex="1">
        <Headline tKey="verify:title" />

        {loading && <Message type="info" tKey="common:message.loading.text" />}
        {error && <Message type="error" tKey="common:message.error.text" />}
      </Body>
      <Footer startYear={2023} companyName="LNCD" />
    </Page>
  );
};

export default Verify;
