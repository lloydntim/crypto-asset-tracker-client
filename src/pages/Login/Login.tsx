import React, {MouseEventHandler} from 'react';
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
import {displayResponseErrorMessage} from '../../helpers/displayResponseErrorMessage';

const Login = () => {
  const navigate = useNavigate();
  const {setLoginToken} = useAuthentication();
  const {
    form: hookedForm,
    formFieldChangeHandler,
    isFormValid,
  } = useForm('username*', 'password*', 'language');
  const {username, password} = hookedForm;
  const [login, {loading, error}] = useMutation(LOGIN, {
    onCompleted: (data) => {
      /* eslint-disable no-undef */
      setLoginToken(data.login.token);
      navigate('/welcome');
    },
  });

  const submitForm: MouseEventHandler = (event) => {
    event.preventDefault();

    login({
      variables: {
        username: username.value,
        password: password.value,
      },
    }).catch((error) => {
      console.log(error);
    });
  };

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
          />
          <Input
            name="password"
            labelTKey="input.label.password"
            placeholderTKey="input.placeholder.enterPassword"
            type="password"
            required={password.required}
            value={password.value}
            onChange={formFieldChangeHandler}
          />
          <Button
            disabled={!isFormValid}
            tKey="button.login"
            type="submit"
            onClick={submitForm}
            mv={16}
          />
          {loading && <Message tKey="common:message:loading:text" />}
          {displayResponseErrorMessage(
            error,
            'login:messages.errors.unableToLoginUser',
          )}
        </Form>

        <Link color={WHITE} to="/register" tKey="button.register" />

        <Link color={WHITE} to="/forgot" tKey="login:link.forgotPassword" />
      </Body>

      <Footer startYear={2023} companyName="LNCD" />
    </Page>
  );
};

export default Login;
