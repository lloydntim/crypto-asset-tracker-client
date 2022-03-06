import React, { ReactElement, FC, useState, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Message } from '../../components';
import { Page } from '../../layouts';
import { useForm } from '../../hooks';
import { useAuthentication } from '../../providers/AuthenticationProvider';

const authorisedUser = {
  username: 'admin',
  password: 'admin',
}
const data = { login: { token: 'abcd' } };
const errorMessage = { type: 'error', text: 'Password is wrong' };

const Login: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  // const [color, setColor] = useState('');
  const { setLoginToken } = useAuthentication();
  const { form: hookedForm, formFieldChangeHandler, isFormValid } = useForm('username*', 'password*', 'language');
  const { username, password } = hookedForm;

  const formFieldFocusHandler = () => setMessage(null);
  const submitForm: MouseEventHandler<Element> = (event) => {
    event.preventDefault();

    if (username.value !== authorisedUser.username) return setMessage({ ...errorMessage, text: 'This user does not exist' });
    if (password.value !== authorisedUser.password) return setMessage(errorMessage);

    setLoginToken(data.login.token);
    navigate('/welcome');
  };

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
      <form>
        <Input
          name="username"
          label="username"
          required={username.required}
          value={username.value}
          onChange={formFieldChangeHandler}
          onFocus={formFieldFocusHandler}
        />
        <br />
        <Input
          name="password"
          label="password"
          type="password"
          required={password.required}
          value={password.value}
          onChange={formFieldChangeHandler}
          onFocus={formFieldFocusHandler}
        />

        <br />

        <Button
          disabled={!isFormValid}
          text="Submit"
          type="submit"
          onClick={submitForm}
        />
      </form>

      <br />

      <Message type={message?.type}>{message?.text}</Message>
    </Page>
  );
};

export default Login;

