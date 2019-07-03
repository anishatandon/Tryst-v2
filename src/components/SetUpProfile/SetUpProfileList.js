import React from 'react';

import SetUpProfileItem from './SetUpProfileItem';

const SetUpProfileList = ({
  authUser,
  messages,
  onEditMessage,
  onRemoveMessage,
}) => (
  <ul>
    {messages.map(messages => (
      <SetUpProfileItem
        authUser={authUser}
        key={messages.uid}
        messages={messages}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);

export default SetUpProfileList;
