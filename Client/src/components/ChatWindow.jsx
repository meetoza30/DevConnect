import React, { useState, useEffect, useRef } from "react";
import { createSocketConnection } from "../utils/sockets";
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { Link } from "react-router-dom";

const ChatWindow = ({ receiverId }) => {
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
        <div className="h-full bg-gray-900 text-white flex flex-col">
            {/* Chat Header */}
            <div className="bg-gray-900 border-b border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to={`/profile/user/${receiverId}`}>
                    <div className="flex items-center space-x-3">
                        <img
                            src={receiverInfo?.profileUrl || '/default-avatar.png'}
                            alt={receiverInfo?.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                                e.target.src = '/default-avatar.png';
                            }}
                        />
                        <div>
                            <h3 className="font-medium text-white">
                                {receiverInfo?.fullName || 'Loading...'}
                            </h3>
                        </div>
                        <img src="https://img.icons8.com/?size=100&id=82787&format=png&color=FFFFFF" className="w-4 h-4"></img>
                    </div>
                    </Link>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={msg._id || index} className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl break-words ${
                                msg.isSent 
                                    ? 'bg-purple-700 text-white ml-12' 
                                    : 'bg-gray-700 text-white mr-12'
                            }`}>
                                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                                    {msg.text || msg.message}
                                </p>
                                <p className="text-xs opacity-70 mt-1">
                                    {formatMessageTime(msg.timestamp || msg.timestamps)}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Message Input */}
            <div className="bg-gray-900 border-t border-gray-700 px-6 py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Message..."
                            className="w-full bg-gray-800 rounded-full px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                        />
                    </div>
                    <button
                        onClick={sendMessage}
                        disabled={!message.trim()}
                        className="text-blue-500 hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
