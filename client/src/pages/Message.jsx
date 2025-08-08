import React from 'react';
import { useParams } from 'react-router-dom';

const Message = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>This is the Message Page</h1>
      {id && <p>You are viewing messages for ID: {id}</p>}
    </div>
  );
};

export default Message;
