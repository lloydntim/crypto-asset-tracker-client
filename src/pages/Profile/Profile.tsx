import React, {FC, useState} from 'react';
import {Dialog, Overlay, Page} from '../../layouts';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {
  Header,
  Body,
  Footer,
  Headline as Title,
  Radios,
  Message,
  Box,
  Navigation,
  Button,
  Text,
  IconButton,
  Form,
  Input,
} from '../../components';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {useMutation, useQuery} from '@apollo/client';
import {
  GET_USER,
  REMOVE_COIN,
  REMOVE_USER,
  RESEND_VERIFICATION_TOKEN,
  UPDATE_USER,
} from '../../graphql';
import {GRAPE_DARK, GRAPE_EXTRA_DARK} from '../../constants/Colors';
import Table, {TableCell, TableRow} from '../../components/Table';
import {useForm} from '../../hooks';

const Profile: FC = () => {
  const [dialog, setDialog] = useState('');
  const [overlay, setOverlay] = useState(false);
  const navigate = useNavigate();
  const {currentUser, setLoginToken} = useAuthentication();
  const {
    form: {email},
    resetForm,
    formFieldChangeHandler,
  } = useForm('email*');

  const userId = currentUser()?.id || '';
  const {
    loading,
    error,
    data: user,
  } = useQuery(GET_USER, {
    variables: {id: userId},
    onCompleted: ({getUser}) => console.log('user', getUser),
    onError: (error) => {
      //  const errorMessage = error.message.split(':')[1].trim();
      //  setResponseMessage(errorMessage);
      console.log('error', error);
    },
  });

  const [
    updateUser,
    {
      data: updateUserMutationData,
      loading: updateUserMutationLoading,
      error: updateUserMutationError,
    },
  ] = useMutation(UPDATE_USER, {
    onCompleted: ({updateUser: {username, email}}) =>
      console.log('message, email was updated successfully'),
    // setResponseMessage(
    //   t('messages_success_emailUpdated', {username, email}),
    // ),
    onError: (error) => {
      // const errorMessage = error.message.split(':')[1].trim();
      console.log('error', error);
      // setResponseMessage(errorMessage);
    },
    refetchQueries: [{query: GET_USER, variables: {id: userId}}],
  });

  const [
    resendVerificationToken,
    {
      data: sendVerificationMutationData,
      loading: sendVerificationMutationLoading,
      error: sendVerificationMutationError,
    },
  ] = useMutation(RESEND_VERIFICATION_TOKEN, {
    onCompleted: ({resendVerificationToken: {message}}) =>
      // setResponseMessage(message),
      console.log('message', message),
    refetchQueries: [{query: GET_USER, variables: {id: userId}}],
  });

  const [
    removeList,
    {loading: removeListMutationLoading, error: removeListMutationError},
  ] = useMutation(REMOVE_COIN, {
    onCompleted: () => navigate('/login'),
  });

  const [
    removeUser,
    {loading: removeUserMutationLoading, error: removeUserMutationError},
  ] = useMutation(REMOVE_USER, {
    onCompleted: ({removeUser: {id}}) => {
      console.log('remove user');
      removeList({variables: {creatorId: id}});
      setLoginToken('');
      navigate('/', {replace: true});
    },
    onError: (error) => {
      // const errorMessage = error.message.split(':')[1].trim();
      console.log('error', error);
      // setResponseMessage(errorMessage);
    },
  });

  const {
    t,
    i18n: {changeLanguage},
  } = useTranslation();

  console.log('data user', user);

  return (
    <Page name="profile">
      <Dialog
        titleTKey="profile:dialog_deleteAccount_title"
        visible={!!dialog}
        onCancelButtonClick={() => setDialog('')}
        onContinueButtonClick={() => {
          setDialog('');
          removeUser({
            variables: {id: userId},
          });
        }}
      >
        <Text color={GRAPE_DARK} tKey="profile:dialog_deleteAccount_message" />
      </Dialog>

      <Overlay
        title={t('profile:form_title_editEmail')}
        titleTKey={t('profile:form_title_editEmail')}
        visible={overlay}
        onCloseButtonClick={() => {
          resetForm();
          setOverlay(false);
        }}
      >
        <Form>
          <Input
            label={t('common:input.label.email')}
            ref={email.ref}
            required
            autoComplete="email"
            name={email.name}
            type="email"
            placeholder={t('common:input.placeholder.enterNewEmail')}
            value={email.value}
            onChange={formFieldChangeHandler}
            mv={12}
            // onBlur={updateFormData}
          />
          <Button
            // disabled={!isFormValid}
            tKey="profile:form_button_updateEmail"
            onClick={() => {
              updateUser({variables: {id: userId, email: email.value}});
              setOverlay(false);
            }}
          />
        </Form>
      </Overlay>

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
        <Navigation />
      </Header>
      <Body flex-col flex="1">
        <Title tKey="profile:title" />
        {loading && <Box>Loading</Box>}
        {error && (
          <Message type="error"> User details could not be loaded</Message>
        )}
        {removeUserMutationLoading && (
          <Message type="error">User could not be loaded</Message>
        )}

        {user?.getUser && (
          <>
            <Table m={20}>
              <TableRow>
                <TableCell valign-m col-w={40}>
                  <Text m={0} strong tKey="common:input.label.email" />
                </TableCell>
                <TableCell valign-m col-w={40}>
                  <Text m={0}>{user.getUser.email}</Text>
                </TableCell>
                <TableCell valign-m col-w={40}>
                  <IconButton
                    type="edit"
                    rank="secondary"
                    onClick={() => {
                      formFieldChangeHandler({
                        name: email.name,
                        value: user.getUser.email,
                      });
                      setOverlay(true);
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell valign-m col-w={40}>
                  <Text strong tKey="profile:label_userStatus" />
                </TableCell>
                <TableCell valign-m col-w={40}>
                  <Text
                    tKey={`common:label.${
                      JSON.parse(user.getUser.isVerified)
                        ? 'verified'
                        : 'pending'
                    }`}
                  />
                </TableCell>
              </TableRow>
            </Table>

            <Box flex-row align-l>
              {!JSON.parse(user.getUser.isVerified) && (
                <Button
                  m={8}
                  tKey={'profile:button_resendVerificationEmail'}
                  onClick={() => {
                    resendVerificationToken({
                      variables: {
                        email: user.email,
                        username: user.username,
                      },
                    });
                  }}
                />
              )}

              <Button
                m={8}
                color={GRAPE_EXTRA_DARK}
                tKey="profile:button_deleteAccount_text"
                onClick={() => {
                  setDialog('deleteAccount');
                }}
              />
            </Box>
          </>
        )}
      </Body>
      <Footer startYear={2019} companyName="LNCD" />
    </Page>
  );
};

export default Profile;
