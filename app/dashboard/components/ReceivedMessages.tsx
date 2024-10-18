import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../styles/messages.css'; 

interface Reply {
  id: number;
  message: number;
  content: string;
  sender: number;
  receiver: number;
  sender_username: string;
  timestamp: string;
}

interface Message {
  id: number;
  buyer_username: string;
  seller_username: string;
  content: string; 
  replies: Reply[]; // Updated to expect replies as an array
  timestamp: string;
  sender: number; // Add sender property
  receiver: number; // Add receiver property
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
          const response = await fetch(
            `https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/messages/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

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
  const replyContentText = replyContent[messageId];
  if (!replyContentText) return;

  try {
    const token = localStorage.getItem("accessToken");
    const originalMessage = messages.find((msg) => msg.id === messageId);
    if (!originalMessage || !userId) return;

    const newReply: Reply = {
      id: Date.now(),
      content: replyContentText,
      sender_username: "You",
      timestamp: new Date().toISOString(),
      message: messageId,
      sender: userId || 0, // Assuming userId is not null; otherwise, handle accordingly
      receiver:
        originalMessage.sender === userId
          ? originalMessage.receiver
          : originalMessage.sender,
    };

    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId
          ? { ...msg, replies: [...msg.replies, newReply] }
          : msg
      )
    );

    // Send the reply to the backend
    const response = await fetch(`http://127.0.0.1:8000/api/reply/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messageId,  
        content: replyContentText,
        
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send reply.');
    }

    const updatedMessage = await response.json();

    setMessages(prevMessages =>
      prevMessages.map(msg => (msg.id === updatedMessage.id ? updatedMessage : msg))
    );

    // Clear the reply input after successful submission
    setReplyContent(prev => ({ ...prev, [messageId]: '' }));

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

  const handleClearChat = async (messageId: number) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/messages/${messageId}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to clear chat.');
    }

    // Update the local state to remove the message
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
    
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
          {messages.map((message) => {
            const isSender = message.sender === userId; // True if the logged-in user is the sender
            const isReceiver = message.receiver === userId; // True if the logged-in user is the receiver

            return (
              <li key={message.id} className="message-item">
                <div className="message-header" onClick={() => toggleMessage(message.id)}>
                  <p>
                    <strong>Message from: {isSender ? message.buyer_username : message.seller_username}</strong>
                    <br />
                    <span className="message-date">{formatTimestamp(message.timestamp)}</span>
                  </p>
                  <button className="toggle-button">
                    {openedMessageId === message.id ? 'Close' : 'Open'}
                  </button>
                </div>
                {openedMessageId === message.id && (
                  <div className="message-content-wrapper">
                    <div className={`message-bubble ${isSender ? 'message-right' : 'message-left'}`}>
                      <p>{message.content}</p>
                    </div>  
                    <div className="message-replies">
                      {message.replies.map(reply => {
                        const isReplySender = reply.sender === userId; 
                        return (
                          <div
                            key={reply.id}
                            className={`reply ${isReplySender ? 'reply-right' : 'reply-left'}`}
                          >
                            <p><strong>{reply.sender_username}</strong></p>
                            <p>{reply.content}</p>
                            <p className="reply-date">{formatTimestamp(reply.timestamp)}</p>
                          </div>
                        );
                      })}
                      <textarea
                        placeholder="Type your reply..."
                        value={replyContent[message.id] || ''}
                        onChange={(e) => handleReplyChange(message.id, e.target.value)}
                        className="reply-input"
                      />
                      <button
                        onClick={() => handleReplySubmit(message.id)}
                        className="reply-button"
                      >
                        Send Reply
                      </button>
                      <button
                      onClick={() => handleClearChat(message.id)} // Calls the handler for clearing the chat
                      className="clear-chat-button"
                    >
                      Clear Chat
                    </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ReceivedMessages;
