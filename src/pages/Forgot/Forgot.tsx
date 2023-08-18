import React from 'react';
import {
  Button,
  Input,
  Message,
  Headline,
  Header,
  Body,
  Footer,
  Form,
  Link,
  Navigation,
} from '../../components';
import {Page} from '../../layouts';
import {useForm} from '../../hooks';
import {useMutation} from '@apollo/client';
import {CREATE_PASSWORD_TOKEN} from '../../graphql';
import {WHITE} from '../../constants/colors';
import {displayResponseErrorMessage} from '../../helpers/displayResponseErrorMessage';

const Forgot = () => {
  const {
    form: {username},
    formFieldChangeHandler,
  } = useForm('username*');
  const [createPasswordToken, {loading, error, data}] = useMutation(
    CREATE_PASSWORD_TOKEN,
  );

  return (
    <Page name="forgot">
      <Header>
        <Navigation />
      </Header>

      <Body>
        <Headline tKey="forgot:title" />

        <Form mv={32}>
          <Input
            name="username"
            type="email"
            labelTKey="input.label.username"
            placeholderTKey="input.placeholder.enterUsername"
            required={username.required}
            value={username.value}
            onChange={formFieldChangeHandler}
          />

          <Button
            mv={16}
            tKey="common:button.submit"
            type="submit"
            onClick={() => {
              createPasswordToken({
                variables: {username: username.value},
              }).catch((error) => console.log(error));
            }}
          />
        </Form>

        <Link color={WHITE} to="/login" tKey="common:button:login" />

        {loading && <Message type="info" tKey="common:message:loading:text" />}

        {displayResponseErrorMessage(error, 'forgot:message.error.text')}

        {data && (
          <Message type="success">{data.createPasswordToken.message}</Message>
        )}
      </Body>

      <Footer startYear={2023} companyName="LNCD" />
    </Page>
  );
};

export default Forgot;
