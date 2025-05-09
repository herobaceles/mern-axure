import { useState } from 'react';

import {
  Webchat,
  WebchatProvider,
  Fab,
  getClient,
  Configuration,
} from '@botpress/webchat';
import React from 'react';

const clientId = "8ec3831b-67ac-4f82-8922-7f6591e42fe0";

const configuration: Configuration = {
  color: '#000',
};

export default function App() {
  const client = getClient({
    clientId,
  });

  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <div style={{ width: '70vw', height: '70vh' }}>
      <WebchatProvider client={client} configuration={configuration}>
        <Fab onClick={toggleWebchat} />
        <div
          style={{
            display: isWebchatOpen ? 'block' : 'none',
          }}
        >
          <Webchat />
        </div>
      </WebchatProvider>
    </div>
  );
}
