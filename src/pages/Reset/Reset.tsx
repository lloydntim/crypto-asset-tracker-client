import React, {
  ReactElement,
  FC,
  useState,
  MouseEventHandler,
  useCallback,
} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
  Button,
  Input,
  Message,
  Headline,
  Header,
  Body,
  Footer,
  Form,
  Text,
} from '../../components';
import {Page} from '../../layouts';
import {useForm} from '../../hooks';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {useMutation, useQuery} from '@apollo/client';
import {GET_PASSWORD_TOKEN, UPDATE_PASSWORD_TOKEN} from '../../graphql';

const Reset: FC = (): ReactElement => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [message, setMessage] = useState(null);
  const {setLoginToken} = useAuthentication();
  const {
    form: {password, passwordConfirm},
    formFieldChangeHandler,
    isFormValid,
  } = useForm('password*', 'passwordConfirm*');

  const formFieldFocusHandler = useCallback(() => setMessage(null), []);

  const {token: resetPasswordToken} = useParams();
  const {loading, error} = useQuery(GET_PASSWORD_TOKEN, {
    variables: {resetPasswordToken},
    /*   onError: ({message}) => {
      setResponseMessage(message);
    }, */
  });
  const [
    updatePassword,
    {loading: mutationLoading, error: mutationError},
  ] = useMutation(UPDATE_PASSWORD_TOKEN, {
    onCompleted: (data) => {
      /* eslint-disable no-undef */
      setLoginToken(data.updatePassword.token);
      navigate('/welcome');
    },
    // onError: (error) =>
    // setResponseMessage(error.message.split(':')[1].trim()),
  });
  return (
    <Page name="reset">
      <Header />
      <Body>
        <Headline tKey="reset:title" />

        <Form flex-col align-c flex="1">
          <Input
            name="password"
            label={t('input.label.password')}
            placeholder={t('input.placeholder.enterPassword')}
            type="password"
            required={password.required}
            value={password.value}
            onChange={formFieldChangeHandler}
            onFocus={formFieldFocusHandler}
            mv={12}
          />

          <Input
            name="passwordConfirm"
            label={t('input.label.passwordConfirm')}
            placeholder={t('input.placeholder.confirmPassword')}
            type="password"
            required={passwordConfirm.required}
            value={passwordConfirm.value}
            onChange={formFieldChangeHandler}
            onFocus={formFieldFocusHandler}
            mv={12}
          />

          <Button
            disabled={!isFormValid}
            tKey="common:button.submit"
            type="submit"
            mv={12}
            onClick={() =>
              updatePassword({
                variables: {resetPasswordToken, password: password.value},
              })
            }
          />
        </Form>
        {(mutationLoading || loading) && (
          <Message type="info">
            <Text tKey="common:message.loading.text" />
          </Message>
        )}
        {error && (
          <Message type="error">
            <Text tKey="common:message.error.text" />
          </Message>
        )}

        {mutationError && (
          <Message type="error">
            <Text tKey="reset:message.error.text" />
          </Message>
        )}
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Reset;
