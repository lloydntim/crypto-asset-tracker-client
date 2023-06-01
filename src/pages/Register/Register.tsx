import React, {
  ReactElement,
  FC,
  useState,
  MouseEventHandler,
  useCallback,
} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useMutation} from '@apollo/client';

import {REGISTER} from '../../graphql';
import {useForm} from '../../hooks';
import {Page} from '../../layouts';
import {
  Button,
  Input,
  Message,
  Headline as Title,
  Header,
  Body,
  Footer,
  Link,
  Radios,
  Form,
} from '../../components';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {WHITE} from '../../constants/Colors';

const Register: FC = (): ReactElement => {
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
    'email*',
    'password*',
    'passwordConfirm*',
  );
  const {username, email, password, passwordConfirm} = hookedForm;

  const passwordsMatching = password.value === passwordConfirm.value;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/;

  const [register, {loading}] = useMutation(REGISTER, {
    onCompleted: (data) => {
      setLoginToken(data.register.token);
      navigate('/welcome');
    },
    onError: (error) => setMessage({text: error.message, type: 'error'}),
  });

  const formFieldFocusHandler = useCallback(() => setMessage(null), []);
  const submitForm: MouseEventHandler<Element> = useCallback(
    (event) => {
      event.preventDefault();

      register({
        variables: {
          username: username.value?.toLowerCase(),
          email: email.value,
          password: password.value,
        },
      });
    },
    [username, email, password, register],
  ); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page name="register">
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
        <Title tKey="register:title" />

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
            name="email"
            label="Email"
            placeholder="Enter email"
            required={email.required}
            value={email.value}
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
            minLength={7}
            maxLength={30}
            pattern={passwordPattern}
            onChange={formFieldChangeHandler}
            onFocus={formFieldFocusHandler}
          />

          <Input
            name="passwordConfirm"
            label="Confirm Password"
            placeholder="Enter password"
            type="password"
            required={passwordConfirm.required}
            value={passwordConfirm.value}
            onChange={formFieldChangeHandler}
            onFocus={formFieldFocusHandler}
          />

          <Button
            disabled={!(isFormValid && passwordsMatching)}
            tKey="button.register"
            type="submit"
            onClick={submitForm}
            mv={16}
          />

          <Message type={loading ? 'info' : message?.type ?? ''}>
            {loading ? 'Loading' : message?.text}
          </Message>
        </Form>

        <Link color={WHITE} to="/login">
          {t('button.login')}
        </Link>
      </Body>

      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Register;
