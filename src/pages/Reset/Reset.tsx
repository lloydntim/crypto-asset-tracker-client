import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Input, Message, Form} from '../../components';
import {Page, PageContent} from '../../layouts';
import {useForm} from '../../hooks';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {useMutation, useQuery} from '@apollo/client';
import {
  GET_PASSWORD_TOKEN,
  UPDATE_PASSWORD_TOKEN,
} from '../../graphql/operations';
import {displayResponseErrorMessage} from '../../helpers/displayResponseErrorMessage';
import {
  FORM_WIDTH,
  PASSWORD_INPUT_MAX_LENGTH,
  PASSWORD_INPUT_MIN_LENGTH,
  PASSWORD_INPUT_PATTERN,
} from '../../constants';

const Reset = () => {
  const navigate = useNavigate();
  const {setLoginToken} = useAuthentication();
  const {
    form: {password, passwordConfirm},
    formFieldChangeHandler,
    isFormValid,
  } = useForm('password*', 'passwordConfirm*');

  const {token: resetPasswordToken} = useParams();

  const {
    loading: getPasswordTokenQueryLoading,
    error: getPasswordTokenQueryError,
  } = useQuery(GET_PASSWORD_TOKEN, {
    errorPolicy: 'all',
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
      setLoginToken(data.updatePassword.token);
      navigate('/portfolio');
    },
  });

  const error = getPasswordTokenQueryError || updatePasswordMutationError;
  const loading = getPasswordTokenQueryLoading || updatePasswordMutationLoading;

  return (
    <Page name="reset">
      <PageContent titleTKey="reset:title" bodyWidth={FORM_WIDTH}>
        <Form>
          <Input
            name="password"
            labelTKey="input.label.password"
            placeholderTKey="input.placeholder.enterPassword"
            type="password"
            pattern={PASSWORD_INPUT_PATTERN}
            minLength={PASSWORD_INPUT_MIN_LENGTH}
            maxLength={PASSWORD_INPUT_MAX_LENGTH}
            required={password.required}
            value={password.value}
            onChange={formFieldChangeHandler}
            $mv={12}
          />

          <Input
            name="passwordConfirm"
            labelTKey="input.label.passwordConfirm"
            placeholderTKey="input.placeholder.confirmPassword"
            type="password"
            pattern={PASSWORD_INPUT_PATTERN}
            minLength={PASSWORD_INPUT_MIN_LENGTH}
            maxLength={PASSWORD_INPUT_MAX_LENGTH}
            required={passwordConfirm.required}
            value={passwordConfirm.value}
            onChange={formFieldChangeHandler}
            $mv={12}
          />

          <Button
            disabled={!isFormValid}
            tKey="common:button.submit"
            type="submit"
            $mv={12}
            $w="100%"
            onClick={() => {
              updatePassword({
                variables: {resetPasswordToken, password: password.value},
              }).catch((error) => console.log(error));
            }}
          />
        </Form>

        {loading && <Message type="info" tKey="common:message.loading.text" />}
        {displayResponseErrorMessage(error)}
      </PageContent>
    </Page>
  );
};

export default Reset;
