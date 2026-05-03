import { useState, useEffect, useCallback, useRef } from 'react';
import Peer from 'peerjs';

export function usePeer(isHost, targetPeerId = null) {
  const [peerId, setPeerId] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const peerRef = useRef(null);
  const connRef = useRef(null);
  
  // Callbacks for receiving messages
  const messageCallbacks = useRef([]);

  const onMessage = useCallback((callback) => {
    messageCallbacks.current.push(callback);
    return () => {
      messageCallbacks.current = messageCallbacks.current.filter((cb) => cb !== callback);
    };
  }, []);

  const sendMessage = useCallback((data) => {
    if (connRef.current && connRef.current.open) {
      connRef.current.send(data);
    } else {
      console.warn("Cannot send message: Connection not open.");
    }
  }, []);

  useEffect(() => {
    // Initialize Peer with custom ICE servers (STUN & TURN)
    // to improve connection success rates across different networks.
    const peer = new Peer({
      config: {
        iceServers: [
          // Free STUN servers (Google)
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          // Free TURN server (OpenRelay Project by Metered.ca)
          {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject'
          },
          {
            urls: 'turn:openrelay.metered.ca:443',
            username: 'openrelayproject',
            credential: 'openrelayproject'
          },
          {
            urls: 'turn:openrelay.metered.ca:443?transport=tcp',
            username: 'openrelayproject',
            credential: 'openrelayproject'
          }
        ]
      }
    });
    peerRef.current = peer;

    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      setPeerId(id);

      // If we are a Controller, try connecting to the Host immediately
      if (!isHost && targetPeerId) {
        console.log(`Connecting to Host: ${targetPeerId}`);
        const conn = peer.connect(targetPeerId, {
          reliable: false, // Use unreliable (UDP-like) for lower latency if possible, though WebRTC DataChannels handle it. For gaming, reliable: false is often better, but PeerJS defaults to reliable: true. We'll leave default for compatibility.
        });
        
        conn.on('open', () => {
          console.log("Connected to Host successfully.");
          setConnected(true);
          connRef.current = conn;
        });

        conn.on('data', (data) => {
          messageCallbacks.current.forEach((cb) => cb(data));
        });

        conn.on('close', () => {
          setConnected(false);
          connRef.current = null;
        });
        
        conn.on('error', (err) => {
            console.error("Connection error:", err);
            setError(err.message);
        });
      }
    });

    peer.on('connection', (conn) => {
      if (isHost) {
        console.log("Incoming connection from:", conn.peer);
        connRef.current = conn;
        
        conn.on('open', () => {
          setConnected(true);
          // Send an initial handshake or sync message if needed
          conn.send({ type: 'HANDSHAKE', message: 'Welcome to the Host!' });
        });

        conn.on('data', (data) => {
          messageCallbacks.current.forEach((cb) => cb(data));
        });

        conn.on('close', () => {
          setConnected(false);
          connRef.current = null;
        });
      }
    });

    peer.on('error', (err) => {
      console.error("PeerJS error:", err);
      setError(err.message);
    });

    return () => {
      if (connRef.current) connRef.current.close();
      peer.destroy();
    };
  }, [isHost, targetPeerId]);

  return { peerId, connected, error, sendMessage, onMessage };
}
