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
import {
  Button,
  Input,
  Message,
  Headline as Title,
  Header,
  Form,
  Body,
  Footer,
  Radios,
  Box,
  Link,
} from '../../components';
import {WHITE} from '../../constants/Colors';

const Login: FC = (): ReactElement => {
  const navigate = useNavigate();
  const {
    t,
    i18n: {changeLanguage},
  } = useTranslation();
  const [message, setMessage] = useState<{text: string; type: string} | null>(
    null,
  );
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
    },
    onError: (error) => {
      setMessage({type: 'error', text: error?.message.split(':')[1].trim()});
    },
  });

  const formFieldFocusHandler = useCallback(() => setMessage(null), []);

  const submitForm: MouseEventHandler<Element> = useCallback(
    (event) => {
      event.preventDefault();

      login({
        variables: {
          username: username.value?.toLowerCase(),
          password: password.value,
        },
      });
    },
    [username, password, login],
  ); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page name="login">
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

      <Body align-c align-m flex="1">
        <Title tKey="login:title" />

        <Form flex-col>
          <Input
            name="username"
            label={t('input.label.username')}
            placeholder={t('input.placeholder.enterUsername')}
            required={username.required}
            value={username.value}
            onChange={formFieldChangeHandler}
            onFocus={formFieldFocusHandler}
          />

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

        <Link color={WHITE} to="/register">
          {t('button.register')}
        </Link>
      </Body>

      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Login;
