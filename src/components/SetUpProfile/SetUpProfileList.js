import React from 'react';

import SetUpProfileItem from './SetUpProfileItem';

const SetUpProfileList = ({
  authUser,
  biodata,
}) => (
  <ul>
    {biodata.map(biodata => (
      <MessageItem
        authUser={authUser}
        key={biodata.uid}
        biodata={biodata}
      />
    ))}
  </ul>
);

export default SetUpProfileList;
