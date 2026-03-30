import React, { useState } from 'react';
import ConvosList from './ConvosList';
import ChatWindow from './ChatWindow';
import { useParams } from 'react-router-dom';

const ConversationPage = () => {
  const { receiverId } = useParams();
  // console.log(receiverId)
  const [selectedConversation, setSelectedConversation] = useState(receiverId || null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile: Show either list or chat, Desktop: Show both */}
      <div className={`${
        isMobileView 
          ? (selectedConversation ? 'hidden' : 'w-full') 
          : 'w-1/3 border-r border-gray-200 dark:border-gray-700'
      } bg-white dark:bg-gray-900`}>
        <ConvosList 
          selectedConversation={selectedConversation} 
          onSelectConversation={setSelectedConversation}
          isMobile={isMobileView}
        />
      </div>

      <div className={`${
        isMobileView 
          ? (selectedConversation ? 'w-full' : 'hidden') 
          : 'flex-1'
      } bg-gray-50 dark:bg-gray-900`}>
        {selectedConversation ? (
          <ChatWindow 
            receiverId={selectedConversation}
            onBack={() => isMobileView && setSelectedConversation(null)}
            isMobile={isMobileView}
          />
        ) : (
          <div className="hidden md:flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-700 dark:text-white">Send private messages to a friend</h3>
              <p className="text-sm mt-2">Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationPage;
