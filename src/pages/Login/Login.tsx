import React, {useState, MouseEventHandler, useCallback} from 'react';
import {useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';

import {LOGIN} from '../../graphql';
import {useForm} from '../../hooks';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {Page} from '../../layouts';
import {
  Button,
  Input,
  Message,
  Headline as Title,
  Header,
  Form,
  Body,
  Footer,
  Link,
  Navigation,
} from '../../components';
import {WHITE} from '../../constants/colors';
import {useTranslation} from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();

  const {t} = useTranslation();

  const [message, setMessage] = useState<{text: string; type: string} | null>(
    null,
  );
  const {setLoginToken} = useAuthentication();
  const {
    form: hookedForm,
    formFieldChangeHandler,
    isFormValid,
  } = useForm('username*', 'password*', 'language');
  const {username, password} = hookedForm;
  const [login, {loading}] = useMutation(LOGIN, {
    onCompleted: (data) => {
      /* eslint-disable no-undef */
      setLoginToken(data.login.token);
      navigate('/welcome');
    },
    onError: (error) => {
      setMessage({
        type: 'error',
        text: error?.message.includes('fetch')
          ? t('login:messages.errors.unableToLoginUser')
          : error?.message,
      });
    },
  });

  const formFieldFocusHandler = useCallback(() => setMessage(null), []);

  const submitForm: MouseEventHandler<Element> = useCallback(
    (event) => {
      event.preventDefault();

      login({
        variables: {
          username: username.value,
          password: password.value,
        },
      });
    },
    [username, password, login],
  ); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page name="login">
      <Header>
        <Navigation />
      </Header>

      <Body flex-col align-c flex="1">
        <Title tKey="login:title" />

        <Form flex-col>
          <Input
            name="username"
            labelTKey="input.label.username"
            placeholderTKey="input.placeholder.enterUsername"
            required={username.required}
            value={username.value}
            onChange={formFieldChangeHandler}
            onFocus={formFieldFocusHandler}
          />

          <Input
            name="password"
            labelTKey="input.label.password"
            placeholderTKey="input.placeholder.enterPassword"
            type="password"
            required={password.required}
            value={password.value}
            onChange={formFieldChangeHandler}
            onFocus={formFieldFocusHandler}
          />

          <Button
            disabled={!isFormValid}
            tKey="button.login"
            type="submit"
            onClick={submitForm}
            mv={16}
          />

          <Message type={loading ? 'info' : message?.type} mv={16}>
            {loading ? 'Loading' : message?.text}
          </Message>
        </Form>

        <Link color={WHITE} to="/register" tKey="button.register" />

        <Link color={WHITE} to="/forgot" tKey="login:link.forgotPassword" />
      </Body>

      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Login;
