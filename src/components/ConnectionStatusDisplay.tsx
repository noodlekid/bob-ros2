'use client';
import React, { useState } from 'react';
import { useROS } from '@/ros/ROSContext';

const ConnectionStatusDisplay: React.FC = () => {
  const { connectionStatus, connect, disconnect } = useROS();
  // default url is probably this
  const [url, setUrl] = useState('ws://localhost:9090');


  // wowow chossing colors based on connection status
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'green';
      case 'error':
        return 'orange';
      case 'disconnected':
      default:
        return 'red';
    }
  };

  const handleConnect = () => {
    if (url.trim()) {
      connect(url.trim());
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="connection-status">
      <div className="indicator" style={{ backgroundColor: getStatusColor() }} />
      <span className="status-text">{connectionStatus}</span>
      <input
        type="text"
        placeholder="Enter ROS IP (ws://...)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleConnect}>Connect</button>
      {connectionStatus === 'connected' && (
        <button onClick={handleDisconnect}>Disconnect</button>
      )}
      {/*Ty chat gpt once again for styling this*/}
      <style jsx>{`
        .connection-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .status-text {
          font-weight: bold;
          text-transform: capitalize;
        }
        input {
          padding: 0.25rem 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 0.25rem 0.75rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default ConnectionStatusDisplay;


