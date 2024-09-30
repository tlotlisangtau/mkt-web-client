import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../styles/messages.css'; 

interface Reply {
  id: number;
  content: string;
  sender_username: string;
  timestamp: string;  // Ensure it's treated as a string
}

interface Message {
  id: number;
  buyer_username: string;
  seller_username: string;
  message_content: string;
  replies: Reply[];  // Updated to expect replies as an array
  timestamp: string;
}

interface DecodedToken {
  user_id: number;
}

const ReceivedMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [openedMessageId, setOpenedMessageId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Decode token to get the user's ID
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUserId(decodedToken.user_id);
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
      fetchMessages();
    }
  }, [userId]);

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
    const reply = replyContent[messageId];
    if (!reply) return;

    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(`http://127.0.0.1:8000/api/reply/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message_id: messageId,
          reply_content: reply,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reply.');
      }

      const updatedMessage = await response.json();
      setMessages(prevMessages =>
        prevMessages.map(msg => (msg.id === updatedMessage.id ? updatedMessage : msg))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleString();
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
                  <strong>Message from Buyer: {message.buyer_username}</strong>
                  <span className="message-date">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </p>
                <button className="toggle-button">
                  {openedMessageId === message.id ? 'Close' : 'Open'}
                </button>
              </div>
              {openedMessageId === message.id && (
                <div className="message-content">
                  <p>{message.message_content}</p>

                  {/* Display replies */}
                  {message.replies.map(reply => (
                    <div key={reply.id} className="reply">
                      <p><strong>{reply.sender_username}:</strong> {reply.content}</p>
                      <p className="reply-date">{formatTimestamp(reply.timestamp)}</p>
                    </div>
                  ))}

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
