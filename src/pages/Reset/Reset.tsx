import React, {ReactElement, FC, useState, useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
  Button,
  Input,
  Message,
  Headline,
  Header,
  Body,
  Footer,
  Form,
  Radios,
} from '../../components';
import {Page} from '../../layouts';
import {useForm} from '../../hooks';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {useMutation, useQuery} from '@apollo/client';
import {GET_PASSWORD_TOKEN, UPDATE_PASSWORD_TOKEN} from '../../graphql';
import {changeLanguage} from 'i18next';

const Reset = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const {setLoginToken} = useAuthentication();
  const {
    form: {password, passwordConfirm},
    formFieldChangeHandler,
    isFormValid,
  } = useForm('password*', 'passwordConfirm*');

  // const formFieldFocusHandler = useCallback(() => setMessage(null), []);

  const {token: resetPasswordToken} = useParams();
  const {
    loading: getPasswordTokenQueryLoading,
    error: getPasswordTokenQueryError,
  } = useQuery(GET_PASSWORD_TOKEN, {
    variables: {resetPasswordToken},
  });
  const [
    updatePassword,
    {
      loading: updatePasswordMutationLoading,
      error: updatePasswordMutationError,
    },
  ] = useMutation(UPDATE_PASSWORD_TOKEN, {
    onCompleted: (data) => {
      /* eslint-disable no-undef */
      setLoginToken(data.updatePassword.token);
      navigate('/welcome');
    },
  });
  return (
    <Page name="reset">
      <Header>
        <Radios
          isButton
          flex-row
          mv={12}
          items={[
            {
              value: 'en',
              label: 'English',
            },
            {
              value: 'de',
              label: 'German',
            },
          ]}
          onChange={({value}) => changeLanguage(value)}
        />
      </Header>
      <Body flex-col align-c flex="1">
        <Headline tKey="reset:title" />

        <Form flex-col align-c flex="1">
          <Input
            name="password"
            labelTKey="input.label.password"
            placeholderTKey="input.placeholder.enterPassword"
            type="password"
            required={password.required}
            value={password.value}
            onChange={formFieldChangeHandler}
            // onFocus={formFieldFocusHandler}
            mv={12}
          />

          <Input
            name="passwordConfirm"
            labelTKey="input.label.passwordConfirm"
            placeholderTKey="input.placeholder.confirmPassword"
            type="password"
            required={passwordConfirm.required}
            value={passwordConfirm.value}
            onChange={formFieldChangeHandler}
            // onFocus={formFieldFocusHandler}
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
        <>
          {(getPasswordTokenQueryLoading || updatePasswordMutationLoading) && (
            <Message type="info" tKey="common:message.loading.text" />
          )}

          {getPasswordTokenQueryError && (
            <Message type="error">{getPasswordTokenQueryError.message}</Message>
          )}

          {updatePasswordMutationError && (
            <Message type="error">
              {updatePasswordMutationError.message}
            </Message>
          )}
        </>
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Reset;
