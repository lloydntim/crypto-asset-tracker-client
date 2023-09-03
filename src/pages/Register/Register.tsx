import React, {useState, MouseEventHandler, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useMutation} from '@apollo/client';

import {REGISTER} from '../../graphql/operations';
import {useForm} from '../../hooks';
import {Page, PageContent} from '../../layouts';
import {Button, Input, Message, Link, Form} from '../../components';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {WHITE} from '../../constants/colors';
import {
  FORM_WIDTH,
  PASSWORD_INPUT_MAX_LENGTH,
  PASSWORD_INPUT_MIN_LENGTH,
  PASSWORD_INPUT_PATTERN,
  USERNAME_INPUT_MAX_LENGTH,
  USERNAME_INPUT_MIN_LENGTH,
  USERNAME_INPUT_PATTERN,
} from '../../constants';

const Register = () => {
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
  } = useForm('username*', 'email*', 'password*', 'passwordConfirm*');
  const {username, email, password, passwordConfirm} = hookedForm;

  const passwordsMatching = password.value === passwordConfirm.value;

  const [register, {loading}] = useMutation(REGISTER, {
    onCompleted: (data) => {
      setLoginToken(data.register.token);
      navigate('/portfolio');
    },
    onError: (error) =>
      setMessage({
        text: error?.message.includes('fetch')
          ? t('register:messages.errors.unableToRegisterUser')
          : error?.message,
        type: 'error',
      }),
  });

  const formFieldFocusHandler = useCallback(() => setMessage(null), []);
  const submitForm: MouseEventHandler<Element> = useCallback(
    (event) => {
      event.preventDefault();

      if (!passwordsMatching) {
        setMessage({
          text: t('register:messages.errors.passwordsNotMatching'),
          type: 'error',
        });

        return;
      }

      register({
        variables: {
          username: username.value?.toLowerCase(),
          email: email.value,
          password: password.value,
        },
      });
    },
    [username, email, password, register, passwordsMatching, t],
  ); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page name="register">
      <PageContent titleTKey="register:title" bodyWidth={FORM_WIDTH}>
        <Form $mv={24}>
          <Input
            name="username"
            labelTKey="common:input.label.username"
            placeholderTKey="input.placeholder.enterUsername"
            pattern={USERNAME_INPUT_PATTERN}
            minLength={USERNAME_INPUT_MIN_LENGTH}
            maxLength={USERNAME_INPUT_MAX_LENGTH}
            required={username.required}
            value={username.value}
            onChange={formFieldChangeHandler}
            onFocus={formFieldFocusHandler}
          />

          <Input
            name="email"
            type="email"
            labelTKey="common:input.label.email"
            placeholderTKey="common:input.placeholder.enterEmail"
            required={email.required}
            value={email.value}
            onChange={formFieldChangeHandler}
            onFocus={formFieldFocusHandler}
          />

          <Input
            name="password"
            labelTKey="common:input.label.password"
            placeholderTKey="common:input.placeholder.enterPassword"
            type="password"
            required={password.required}
            value={password.value}
            pattern={PASSWORD_INPUT_PATTERN}
            minLength={PASSWORD_INPUT_MIN_LENGTH}
            maxLength={PASSWORD_INPUT_MAX_LENGTH}
            onChange={formFieldChangeHandler}
            onFocus={formFieldFocusHandler}
          />

          <Input
            name="passwordConfirm"
            labelTKey="common:input.label.passwordConfirm"
            placeholderTKey="common:input.placeholder.confirmNewPassword"
            type="password"
            required={passwordConfirm.required}
            value={passwordConfirm.value}
            pattern={PASSWORD_INPUT_PATTERN}
            minLength={PASSWORD_INPUT_MIN_LENGTH}
            maxLength={PASSWORD_INPUT_MAX_LENGTH}
            onChange={formFieldChangeHandler}
            onFocus={formFieldFocusHandler}
          />

          <Button
            disabled={!isFormValid && !passwordsMatching}
            tKey="common:button.register"
            type="submit"
            onClick={submitForm}
            $mv={16}
          />

          <Message type={loading ? 'info' : message?.type ?? ''}>
            {loading ? t('common:message:loading:text') : message?.text}
          </Message>
        </Form>

        <Link $color={WHITE} to="/login" tKey="common:button.login" />
      </PageContent>
    </Page>
  );
};

export default Register;
