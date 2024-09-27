"use client";

import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../styles/messages.css'; 

interface Message {
  reply?: string;
  id: number;
  buyer: number;
  seller: number;
  job: number | null;
  sport: number | null;
  furniture: number | null;
  real_estate: number | null;
  health_beauty: number | null;
  message_content: string;
  timestamp: string;
}

interface DecodedToken {
  user_id: number;
}

const ReceivedMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null); // State for seller ID
  const [openedMessageId, setOpenedMessageId] = useState<number | null>(null); // State to track opened message
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    // Decode token to get the seller's (user) ID
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUserId(decodedToken.user_id); // Set the seller's ID
      } catch (err) {
        setError('Invalid token');
        setIsLoading(false);
      }
    } else {
      setError('No token found');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch messages only after the userId is set
    const fetchMessages = async () => {
      if (userId !== null) {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await fetch(`http://127.0.0.1:8000/api/messages/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch messages.');
          }

          const data = await response.json();
          setMessages(data);
          setIsLoading(false);
        } catch (err: any) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    if (userId !== null) {
      fetchMessages(); // Fetch messages only if userId is set
    }
  }, [userId]); // Re-run when userId is set

  if (isLoading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const toggleMessage = (messageId: number) => {
    setOpenedMessageId(openedMessageId === messageId ? null : messageId);
  };

  const handleReplyChange = (messageId: number, content: string) => {
    setReplyContent(prev => ({ ...prev, [messageId]: content }));
  };

  const handleReplySubmit = async (messageId: number) => {
    const reply = replyContent[messageId]; // Get the reply content for the specific message
    if (!reply) return; // Do nothing if reply is empty

    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(`http://127.0.0.1:8000/api/reply/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message_id: messageId, // Send the message ID for which we are replying
          reply_content: reply, // The reply content
          user_id: userId, // Seller's ID (from token)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reply.');
      }

      const updatedMessage = await response.json(); // Get the updated message with the reply
      setMessages(prevMessages =>
        prevMessages.map(msg => (msg.id === updatedMessage.id ? updatedMessage : msg))
      ); // Update the message in the list with the new reply
    } catch (err: any) {
      setError(err.message);
    }
  };



  return (
<div className="messages-container">
      <h2>Received Messages</h2>
      {messages.length === 0 ? (
        <p>No messages received yet.</p>
      ) : (
        <ul className="message-list">
          {messages.map((message) => (
            <li key={message.id} className="message-item">
              <div className="message-header" onClick={() => toggleMessage(message.id)}>
                <p>
                  <strong>Message from Buyer (ID: {message.buyer})</strong>
                  <span className="message-date">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </p>
                <button className="toggle-button">
                  {openedMessageId === message.id ? 'Close' : 'Open'}
                </button>
              </div>
              {openedMessageId === message.id && (
                <div className="message-content">
                  <p>{message.message_content}</p>

                  {/* Display reply if it exists */}
                  {message.reply && (
                    <p>
                      <strong>Your Reply:</strong> {message.reply}
                    </p>
                  )}

                  {/* Reply input form */}
                  <textarea
                    placeholder="Type your reply..."
                    value={replyContent[message.id] || ''}
                    onChange={(e) => handleReplyChange(message.id, e.target.value)}
                    className="reply-input"
                  />
                  <button onClick={() => handleReplySubmit(message.id)} className="reply-button">
                    Send Reply
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReceivedMessages;
