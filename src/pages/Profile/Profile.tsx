import React, {useState} from 'react';
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
import {GRAPE_DARK, GRAPE_EXTRA_DARK} from '../../constants/colors';
import Table, {TableCell, TableRow} from '../../components/Table';
import {useForm} from '../../hooks';

const Profile = () => {
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
    skip: !Boolean(userId),
  });

  const [
    updateUser,
    {
      data: updateUserMutationData,
      loading: updateUserMutationLoading,
      error: updateUserMutationError,
    },
  ] = useMutation(UPDATE_USER, {
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
    refetchQueries: [{query: GET_USER, variables: {id: userId}}],
  });

  const [
    removeCoin,
    {loading: removeCoinMutationLoading, error: removeCoinMutationError},
  ] = useMutation(REMOVE_COIN, {
    errorPolicy: 'all',
    onCompleted: () => {
      removeUser({
        variables: {id: userId},
      });
    },
  });

  const [
    removeUser,
    {loading: removeUserMutationLoading, error: removeUserMutationError},
  ] = useMutation(REMOVE_USER, {
    onCompleted: () => {
      setLoginToken('');
      navigate('/', {replace: true});
    },
  });

  const {
    i18n: {changeLanguage},
  } = useTranslation();

  return (
    <Page name="profile">
      <Dialog
        titleTKey="profile:dialog_deleteAccount_title"
        visible={!!dialog}
        onCancelButtonClick={() => setDialog('')}
        onContinueButtonClick={() => {
          setDialog('');
          removeCoin({variables: {creatorId: userId}});
        }}
      >
        <Text color={GRAPE_DARK} tKey="profile:dialog_deleteAccount_message" />
      </Dialog>

      <Overlay
        titleTKey="profile:form_title_editEmail"
        visible={overlay}
        onCloseButtonClick={() => {
          resetForm();
          setOverlay(false);
        }}
      >
        <Form>
          <Input
            labelTKey="common:input.label.email"
            ref={email.ref}
            required
            autoComplete="email"
            name={email.name}
            type="email"
            placeholderTKey="common:input.placeholder.enterNewEmail"
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
        {(loading ||
          sendVerificationMutationLoading ||
          updateUserMutationLoading ||
          removeUserMutationLoading ||
          removeCoinMutationLoading) && <Message type="info">Loading</Message>}
        {error && (
          <Message type="error">User details could not be loaded</Message>
        )}
        {removeUserMutationError && (
          <Message type="error">User could not be removed</Message>
        )}

        {updateUserMutationError && (
          <Message type="error">{updateUserMutationError.message}</Message>
        )}

        {removeCoinMutationError && (
          <Message type="error">{removeCoinMutationError.message}</Message>
        )}

        {sendVerificationMutationError && (
          <Message type="error">
            {sendVerificationMutationError.message}
          </Message>
        )}

        {sendVerificationMutationData && (
          <Message type="info">
            {sendVerificationMutationData.resendVerificationToken.message}
          </Message>
        )}

        {updateUserMutationData && (
          <Message type="info">
            {updateUserMutationData.updateUser.message}
          </Message>
        )}

        {user?.getUser && (
          <>
            <Table m={20}>
              <TableRow>
                <TableCell valign-m col-w={40}>
                  <Text m={0} strong tKey="common:input.label.username" />
                </TableCell>
                <TableCell valign-m col-w={40}>
                  <Text m={0}>{user.getUser.username}</Text>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell valign-m col-w={40}>
                  <Text strong tKey="common:input.label.email" />
                </TableCell>
                <TableCell valign-m col-w={40}>
                  <Text>{user.getUser.email}</Text>
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
                  tKey="profile:button_resendVerificationEmail"
                  onClick={() => {
                    resendVerificationToken({
                      variables: {
                        email: user.getUser.email,
                        username: user.getUser.username,
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
