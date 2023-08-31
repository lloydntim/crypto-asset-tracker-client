import React from 'react';
import {Message} from '../components';
import {ApolloError} from '@apollo/client';

export const displayResponseErrorMessage = (
  error?: ApolloError,
  customMessageTKey: string = 'common:message.error.text',
) => {
  if (!error) return null;

  if (error?.message.includes('fetch') || error?.message.includes('Response'))
    return <Message type="error" $mv={16} tKey={customMessageTKey} />;

  return (
    <Message type="error" $mv={16}>
      {error.message}
    </Message>
  );
};
