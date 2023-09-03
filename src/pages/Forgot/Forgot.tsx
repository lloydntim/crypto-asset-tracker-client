import React from 'react';
import {Button, Input, Message, Form, Link} from '../../components';
import {Page, PageContent} from '../../layouts';
import {useForm} from '../../hooks';
import {useMutation} from '@apollo/client';
import {CREATE_PASSWORD_TOKEN} from '../../graphql/operations';
import {WHITE} from '../../constants/colors';
import {displayResponseErrorMessage} from '../../helpers/displayResponseErrorMessage';
import {
  FORM_WIDTH,
  USERNAME_INPUT_MAX_LENGTH,
  USERNAME_INPUT_MIN_LENGTH,
  USERNAME_INPUT_PATTERN,
} from '../../constants';

const Forgot = () => {
  const {
    form: {username},
    formFieldChangeHandler,
    isFormValid,
  } = useForm('username*');
  const [createPasswordToken, {loading, error, data}] = useMutation(
    CREATE_PASSWORD_TOKEN,
  );

  return (
    <Page name="forgot">
      <PageContent titleTKey="forgot:title" bodyWidth={FORM_WIDTH}>
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

          <Button
            $mv={16}
            disabled={!isFormValid}
            tKey="common:button.submit"
            type="submit"
            onClick={() => {
              createPasswordToken({
                variables: {username: username.value},
              }).catch((error) => console.log(error));
            }}
          />
        </Form>

        <Link $color={WHITE} to="/login" tKey="common:button:login" />

        {loading && <Message type="info" tKey="common:message:loading:text" />}

        {displayResponseErrorMessage(error, 'forgot:message.error.text')}

        {data && (
          <Message type="success">{data.createPasswordToken.message}</Message>
        )}
      </PageContent>
    </Page>
  );
};

export default Forgot;
