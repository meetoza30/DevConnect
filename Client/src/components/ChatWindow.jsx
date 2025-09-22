import React, { useState, useEffect, useRef } from "react";
import { createSocketConnection } from "../utils/sockets";
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { Link } from "react-router-dom";

const ChatWindow = ({ receiverId, onBack, isMobile }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState();
    const [receiverInfo, setReceiverInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    
    let user = localStorage.getItem('userData');
    if (user) {
        user = JSON.parse(user);
    }
    const userId = user?._id;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getMessages = async () => {
        try {
            const res = await axios.get(BASE_URL + `/convos/${receiverId}`, {
                withCredentials: true
            });
            setMessages(res.data.messages.map(msg => ({
                ...msg,
                isSent: msg.senderId === userId
            })));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchReceiverInfo = async () => {
        try {
            const res = await axios.get(
                BASE_URL + `/profile/user/${receiverId}`,
                { withCredentials: true }
            );
            setReceiverInfo(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!userId || !receiverId) return;

        setLoading(true);
        getMessages();
        fetchReceiverInfo();

        const socketConnection = createSocketConnection();
        setSocket(socketConnection);
        socketConnection.emit("joinChat", { userId, receiverId });

        socketConnection.on("messageReceived", ({ messageData }) => {
            const { senderId, message, timestamp, text } = messageData;
            if (senderId !== userId) {
                setMessages(prev => [...prev, {
                    senderId,
                    text: text || message,
                    timestamp: timestamp || new Date(),
                    timestamps: timestamp || new Date(),
                    isSent: false
                }]);
            }
        });

        return () => {
            socketConnection.disconnect();
        };
    }, [userId, receiverId]);

    const sendMessage = () => {
        if (!message.trim() || !socket) return;

        const messageData = {
            senderId: userId,
            receiverId,
            message: message,
            timestamp: new Date(),
            senderName: user.fullName
        };

        socket.emit("sendMessage", messageData);
        setMessages(prev => [...prev, { 
            senderId: userId,
            text: message,
            timestamp: new Date(),
            timestamps: new Date(),
            isSent: true 
        }]);
        setMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatMessageTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-900">
                <div className="text-gray-400">Loading chat...</div>
            </div>
        );
    }

    return (
         <div className="h-full flex flex-col bg-gray-900">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-gray-700 bg-gray-900 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          {/* Back button for mobile */}
          {isMobile && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {/* User info */}
          <div className="relative flex-shrink-0">
                                            <img
                                                src={receiverInfo?.profileUrl || '/default-avatar.png'}
                                                alt={receiverInfo?.fullName}
                                                className="w-14 h-14 rounded-full"
                                                onError={(e) => {
                                                    e.target.src = '/default-avatar.png';
                                                }}
                                            />
                                        </div>
          
          <div className="flex-1 min-w-0">
            <Link to={`/profile/user/${receiverId}`} className="hover:underline">
              <h2 className="text-lg font-semibold text-white truncate">
                {receiverInfo?.fullName || 'Loading...'}
              </h2>
            </Link>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-900">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-2xl ${
              msg.isSent
                ? 'bg-blue-600 text-white rounded-br-sm'
                : 'bg-gray-700 text-gray-100 rounded-bl-sm'
            }`}>
              <p className="text-sm break-words">{msg.text || msg.message}</p>
              <p className={`text-xs mt-1 ${
                msg.isSent ? 'text-blue-200' : 'text-gray-400'
              }`}>
                {formatMessageTime(msg.timestamp || msg.timestamps)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="px-4 py-3 border-t border-gray-700 bg-gray-900">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm max-h-32"
              style={{
                minHeight: '40px',
                height: 'auto',
              }}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    );
};

export default ChatWindow;
