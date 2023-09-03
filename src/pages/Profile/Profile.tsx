import React, {useState} from 'react';
import {Dialog, Overlay, Page, PageContent} from '../../layouts';
import {useNavigate} from 'react-router-dom';
import {
  Message,
  Box,
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
} from '../../graphql/operations';
import {GRAPE_DARK, GRAPE_EXTRA_DARK} from '../../constants/colors';
import Table, {TableCell, TableRow} from '../../components/Table';
import {useForm} from '../../hooks';
import {displayResponseErrorMessage} from '../../helpers/displayResponseErrorMessage';

const PROFILE_TABLE_WIDTH = 520;
const PROFILE_TABLE_COLUMN_1_WIDTH = 28;
const PROFILE_TABLE_COLUMN_2_WIDTH = 40;
const PROFILE_TABLE_COLUMN_3_WIDTH = 28;

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

  const userId = currentUser()?.id;
  const {
    loading: getUserQueryLoading,
    error: getUserQueryError,
    data: user,
  } = useQuery(GET_USER, {
    variables: {id: userId},
    skip: !userId,
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
  const loading =
    getUserQueryLoading ||
    sendVerificationMutationLoading ||
    updateUserMutationLoading ||
    removeUserMutationLoading ||
    removeCoinMutationLoading;
  const error =
    getUserQueryError ||
    removeUserMutationError ||
    updateUserMutationError ||
    removeCoinMutationError ||
    sendVerificationMutationError;

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
        <Text $color={GRAPE_DARK} tKey="profile:dialog_deleteAccount_message" />
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
            $mv={12}
          />
          <Button
            tKey="profile:form_button_updateEmail"
            onClick={() => {
              updateUser({variables: {id: userId, email: email.value}}).catch(
                (error) => {
                  console.log(error);
                },
              );
              setOverlay(false);
            }}
          />
        </Form>
      </Overlay>

      <PageContent isAuthorised titleTKey="profile:title">
        {loading && <Message type="info" tKey="common:message:loading:text" />}
        {displayResponseErrorMessage(error, 'common:message.error.text')}

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
          <Box $flex-col $w={PROFILE_TABLE_WIDTH}>
            <Table $tbl-br-spc={12} $mv={32}>
              <TableRow>
                <TableCell $valign-m $col-w={PROFILE_TABLE_COLUMN_1_WIDTH}>
                  <Text $m={0} strong tKey="common:input.label.username" />
                </TableCell>
                <TableCell $valign-m $col-w={PROFILE_TABLE_COLUMN_2_WIDTH}>
                  <Text $m={0}>{user.getUser.username}</Text>
                </TableCell>
                <TableCell $valign-m $col-w={PROFILE_TABLE_COLUMN_3_WIDTH} />
              </TableRow>
              <TableRow>
                <TableCell $valign-m $col-w={PROFILE_TABLE_COLUMN_1_WIDTH}>
                  <Text $m={0} strong tKey="common:input.label.email" />
                </TableCell>
                <TableCell $valign-m $col-w={PROFILE_TABLE_COLUMN_2_WIDTH}>
                  <Text $m={0}>{user.getUser.email}</Text>
                </TableCell>
                <TableCell $valign-m $col-w={PROFILE_TABLE_COLUMN_3_WIDTH}>
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
                <TableCell $valign-m $col-w={PROFILE_TABLE_COLUMN_1_WIDTH}>
                  <Text $m={0} strong tKey="profile:label_userStatus" />
                </TableCell>
                <TableCell $valign-m $col-w={PROFILE_TABLE_COLUMN_2_WIDTH}>
                  <Text
                    $m={0}
                    tKey={`common:label.${
                      JSON.parse(user.getUser.isVerified as string)
                        ? 'verified'
                        : 'pending'
                    }`}
                  />
                </TableCell>
                <TableCell $valign-m $col-w={PROFILE_TABLE_COLUMN_3_WIDTH} />
              </TableRow>
            </Table>

            <Box $flex-row $align-l>
              {!JSON.parse(user.getUser.isVerified) && (
                <Button
                  $m={8}
                  tKey="profile:button_resendVerificationEmail"
                  onClick={() => {
                    resendVerificationToken({
                      variables: {
                        email: user.getUser.email,
                        username: user.getUser.username,
                      },
                    }).catch((error) => {
                      console.log(error);
                    });
                  }}
                />
              )}

              <Button
                $m={8}
                $color={GRAPE_EXTRA_DARK}
                tKey="profile:button_deleteAccount_text"
                onClick={() => setDialog('deleteAccount')}
              />
            </Box>
          </Box>
        )}
      </PageContent>
    </Page>
  );
};

export default Profile;
