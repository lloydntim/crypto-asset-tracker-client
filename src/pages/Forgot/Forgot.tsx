import React, { ReactElement, FC, useState, MouseEventHandler, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Button, Input, Message, Headline, Header, Body, Footer } from '../../components';
import { Page } from '../../layouts';
import { useForm } from '../../hooks';
import { useAuthentication } from '../../providers/AuthenticationProvider';

const authorisedUser = {
  username: 'admin',
  password: 'admin',
}
const data = { login: { token: 'abcd' } };
const errorMessage = { type: 'error', text: 'Password is wrong' };

const Forgot: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [message, setMessage] = useState(null);
  const { setLoginToken } = useAuthentication();
  const { form: hookedForm, formFieldChangeHandler, isFormValid } = useForm('username*', 'password*', 'passwordConfirm*');
  const { username, password } = hookedForm;

  const formFieldFocusHandler = useCallback(() => setMessage(null), []);

  const submitForm: MouseEventHandler<Element> = useCallback((event) => {
    event.preventDefault();

    if (username.value !== authorisedUser.username) return setMessage({ ...errorMessage, text: 'This user does not exist' });
    if (password.value !== authorisedUser.password) return setMessage(errorMessage);

    setLoginToken(data.login.token);
    navigate('/welcome');
  }, [username, password]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page name="forgot">
      <Header />
      <Body>
        <Headline>Forgot</Headline>

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

          <Button
            disabled={!isFormValid}
            tKey="button.login"
            type="submit"
            onClick={submitForm}
          />
        </form>
        <Message type={message?.type}>{message?.text}</Message>
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Forgot;

