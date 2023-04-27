import React, {
  ReactElement,
  FC,
  useState,
  MouseEventHandler,
  useCallback,
} from 'react';
import {useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {LOGIN} from '../../graphql';
import {useForm} from '../../hooks';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {Page} from '../../layouts';
import {Button, Input, Message, Headline} from '../../components';

// const authorisedUser = {
// username: 'admin',
// password: 'admin',
// }
// const data = { login: { token: 'abcd' } };
// const errorMessage = { type: 'error', text: 'Password is wrong' };

const Login: FC = (): ReactElement => {
  const navigate = useNavigate();
  const {
    t,
    i18n: {changeLanguage},
  } = useTranslation();
  const [message, setMessage] = useState(null);
  // const [color, setColor] = useState('');
  const {setLoginToken} = useAuthentication();
  const {form: hookedForm, formFieldChangeHandler, isFormValid} = useForm(
    'username*',
    'password*',
    'language',
  );
  const {username, password} = hookedForm;
  const [login, {loading}] = useMutation(LOGIN, {
    onCompleted: (data) => {
      /* eslint-disable no-undef */
      setLoginToken(data.login.token);
      navigate('/welcome');
      // localStorage.setItem('token', data.login.token);
      // push('/vocablists');
    },
    onError: (error) => {
      // Sentry.captureException(error);
      // console.log('Login:  ', error);
      setMessage(error.message.split(':')[1].trim());
    },
  });

  const formFieldFocusHandler = useCallback(() => setMessage(null), []);

  const submitForm: MouseEventHandler<Element> = useCallback(
    (event) => {
      event.preventDefault();

      login({
        variables: {
          username: username.value.toLowerCase(),
          password: password.value,
        },
      });

      // if (username.value !== authorisedUser.username) return setMessage({ ...errorMessage, text: 'This user does not exist' });
      // if (password.value !== authorisedUser.password) return setMessage(errorMessage);

      // setLoginToken(data.login.token);
      // navigate('/welcome');
    },
    [username, password, login],
  ); // eslint-disable-line react-hooks/exhaustive-deps

  const languageChangeHandler = (language: string) => () =>
    changeLanguage(language);

  return (
    <Page name="login">
      {/* <Input
        name="test"
        label="Color"
        type="text"
        value={color}
        dataList={[
          { text: 'Blue', value: 'blue' },
          { text: 'Red', value: 'blue' },
          { text: 'Burgundi', value: 'blue' },
          { text: 'Green', value: 'blue' },
          { text: 'Turquoise', value: 'blue' },
        ]}
        onChange={({ value }) => setColor(value)}
      /> */}
      <Headline tKey="login:title" />

      <br />
      <button onClick={languageChangeHandler('en')}>EN</button>
      <button onClick={languageChangeHandler('de')}>DE</button>
      <br />

      <form>
        <Input
          name="username"
          label={t('input.label.username')}
          placeholder={t('input.placeholder.enterUsername')}
          required={username.required}
          value={username.value}
          onChange={formFieldChangeHandler}
          onFocus={formFieldFocusHandler}
        />
        <br />
        <Input
          name="password"
          label={t('input.label.password')}
          placeholder={t('input.placeholder.enterPassword')}
          type="password"
          required={password.required}
          value={password.value}
          onChange={formFieldChangeHandler}
          onFocus={formFieldFocusHandler}
        />

        <br />

        <Button
          disabled={!isFormValid}
          tKey="button.login"
          type="submit"
          onClick={submitForm}
        />
      </form>
      <br />

      <Message type={loading ? 'info' : message?.type}>
        {loading ? 'Loading' : message?.text}
      </Message>
    </Page>
  );
};

export default Login;
