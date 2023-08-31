import React, {useEffect} from 'react';
import {Page, PageContent} from '../../layouts';
import {Message} from '../../components';
import {useMutation} from '@apollo/client';
import {VERIFY} from '../../graphql';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {useNavigate, useParams} from 'react-router-dom';
import {displayResponseErrorMessage} from '../../helpers/displayResponseErrorMessage';
import {FORM_WIDTH} from '../../constants';

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
    verify({variables: {token}}).catch((error) => {
      navigate('/');
      console.log(error);
    });
  }, [token, verify, navigate]);

  return (
    <Page name="verify">
      <PageContent titleTKey="verify:title" bodyWidth={FORM_WIDTH}>
        {loading && <Message type="info" tKey="common:message.loading.text" />}
        {displayResponseErrorMessage(error, 'common:message.error.text')}
      </PageContent>
    </Page>
  );
};

export default Verify;
