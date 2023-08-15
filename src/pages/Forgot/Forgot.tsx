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
        <Headline>Forgot</Headline>

        <Form>
          <Input
            name="username"
            labelTKey="input.label.username"
            placeholderTKey="input.placeholder.enterUsername"
            required={username.required}
            value={username.value}
            onChange={formFieldChangeHandler}
            // onFocus={formFieldChangeHandler}
          />

          <Button
            mv={16}
            tKey="common:button.submit"
            type="submit"
            onClick={() => {
              createPasswordToken({variables: {username: username.value}});
            }}
          />
        </Form>

        <Link color={WHITE} to="/login" tKey="common:button:login" />

        {loading && <Message type="info" tKey="common:message:loading:text" />}
        {error && <Message type="error">{error.message}</Message>}
        {data && (
          <Message type="success">{data.createPasswordToken.message}</Message>
        )}
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Forgot;
