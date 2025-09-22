import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const ConvosList = ({ selectedConversation, onSelectConversation, isMobile }) => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    let user = localStorage.getItem('userData');
    if (user) {
        user = JSON.parse(user);
    }
    const userId = user?._id;

    useEffect(() => {
        fetchConversations();
    }, [userId]);

    // useEffect(() => {
    //     console.log("Conversations updated:", conversations);
    // }, [conversations]);

    const fetchConversations = async () => {
        try {
            const response = await axios.get(BASE_URL + `/get-conversations`, {
                withCredentials: true
            });
            setConversations(response.data.conversations);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredConversations = conversations.filter(conv => {
        const otherUser = conv.participants?.find(p => p._id !== userId);
        return otherUser?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const formatLastMessageTime = (timestamp) => {
        if (!timestamp) return '';
        
        const now = new Date();
        const messageTime = new Date(timestamp);
        const diffInHours = (now - messageTime) / (1000 * 60 * 60);
        
        if (diffInHours < 24) {
            return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffInHours < 168) {
            return messageTime.toLocaleDateString([], { weekday: 'short' });
        } else {
            return messageTime.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    };

    return (
          <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-900 sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-white mb-3">Messages</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto bg-gray-900">
        {loading ? (
          <div className="p-4 text-center text-gray-400">
            <div className="animate-pulse">Loading conversations...</div>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <p>No conversations found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {filteredConversations.map((conversation) => {
              const otherUser = conversation.participants?.find(p => p._id !== userId);
              const isSelected = selectedConversation === otherUser?._id;
              
              return (
                <div
                  key={conversation._id}
                  onClick={() => onSelectConversation(otherUser?._id)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-800 active:bg-gray-700 ${
                    isSelected ? 'bg-gray-800 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                                            <img
                                                src={otherUser?.profileUrl || '/default-avatar.png'}
                                                alt={otherUser?.fullName}
                                                className="w-14 h-14 rounded-full"
                                                onError={(e) => {
                                                    e.target.src = '/default-avatar.png';
                                                }}
                                            />
                                        </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-white truncate">
                          {otherUser?.fullName || 'Unknown User'}
                        </h3>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                          {formatLastMessageTime(conversation.lastMessage?.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 truncate mt-1">
                        {conversation.lastMessage?.text || 'Start a conversation'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>

    );
};

export default ConvosList;
