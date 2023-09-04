import React, {MouseEventHandler} from 'react';
import {useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';

import {LOGIN} from '../../graphql/operations';
import {useForm} from '../../hooks';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {Page, PageContent} from '../../layouts';
import {Button, Input, Message, Form, Link, Box} from '../../components';
import {WHITE} from '../../constants/colors';
import {displayResponseErrorMessage} from '../../helpers/displayResponseErrorMessage';
import {
  FORM_WIDTH,
  PASSWORD_INPUT_MAX_LENGTH,
  PASSWORD_INPUT_MIN_LENGTH,
  PASSWORD_INPUT_PATTERN,
  USERNAME_INPUT_MAX_LENGTH,
  USERNAME_INPUT_MIN_LENGTH,
  USERNAME_INPUT_PATTERN,
} from '../../constants';

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
      setLoginToken(data.login.token);
      navigate('/portfolio');
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
      <PageContent titleTKey="login:title" bodyWidth={FORM_WIDTH}>
        <Form $mv={24}>
          <Input
            name="username"
            labelTKey="input.label.username"
            placeholderTKey="input.placeholder.enterUsername"
            pattern={USERNAME_INPUT_PATTERN}
            minLength={USERNAME_INPUT_MIN_LENGTH}
            maxLength={USERNAME_INPUT_MAX_LENGTH}
            required={username.required}
            value={username.value}
            onChange={formFieldChangeHandler}
          />
          <Input
            name="password"
            labelTKey="input.label.password"
            placeholderTKey="input.placeholder.enterPassword"
            pattern={PASSWORD_INPUT_PATTERN}
            minLength={PASSWORD_INPUT_MIN_LENGTH}
            maxLength={PASSWORD_INPUT_MAX_LENGTH}
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
            $mv={16}
            $w="100%"
          />
          {loading && <Message tKey="common:message:loading:text" />}
          {displayResponseErrorMessage(
            error,
            'login:messages.errors.unableToLoginUser',
          )}
        </Form>

        <Box $spc-btw>
          <Link $color={WHITE} to="/register" tKey="common:button.register" />
          <Link $color={WHITE} to="/forgot" tKey="login:link.forgotPassword" />
        </Box>
      </PageContent>
    </Page>
  );
};

export default Login;
