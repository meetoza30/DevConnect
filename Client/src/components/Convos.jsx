import React, { useState } from 'react';
import ConvosList from './ConvosList';
import ChatWindow from './ChatWindow';
import { useParams } from 'react-router-dom';

const ConversationPage = () => {
    const { receiverId } = useParams();
    const [selectedConversation, setSelectedConversation] = useState(receiverId || null);

    return (
        <div className="h-screen bg-gray-900 flex overflow-hidden">
            {/* Left Sidebar - Conversations List */}
            <div className="w-80 border-r border-gray-700 flex-shrink-0">
                <ConvosList 
                    selectedConversation={selectedConversation}
                    onSelectConversation={setSelectedConversation}
                />
            </div>
            
            {/* Right Side - Chat Window */}
            <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                    <ChatWindow receiverId={selectedConversation} />
                ) : (
                    <div className="h-full flex items-center justify-center bg-gray-900">
                        <div className="text-center text-gray-400">
                            <div className="w-20 h-20 mx-auto mb-4 border-2 border-gray-600 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-light mb-2">Your Messages</h3>
                            <p className="text-sm text-gray-500">Send private messages to a friend</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConversationPage;
