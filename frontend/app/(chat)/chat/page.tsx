'use client';

import { useState, useEffect } from 'react';
import LogOutButton from '@/components/logout-button';
import Conversation from '@/components/chat/conversation';
import SidebarMenu from '@/components/chat/sidebar-menu';
import useConversation from '@/zustand/useConversation';
import { useAuthContext } from '@/context/AuthContext';

const ChatApp = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
        setShowSidebar(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileView && selectedConversation) {
      setShowSidebar(false);
    } else if (isMobileView && !selectedConversation) {
      setShowSidebar(true);
    }
  }, [isMobileView, selectedConversation]);

  return (
    <div className="grid md:grid-cols-4 h-screen overflow-hidden">
      {showSidebar && <SidebarMenu />}
      <div
        className={`flex flex-col h-screen md:col-span-3 ${
          showSidebar ? 'hidden md:flex' : 'flex'
        }`}
      >
        {!selectedConversation ? (
          <NoSelectedChat />
        ) : (
          <Conversation
            convo={selectedConversation}
            setSelectedConversation={setSelectedConversation}
          />
        )}
      </div>
    </div>
  );
};

export default ChatApp;

const NoSelectedChat = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex flex-col relative gap-2 justify-center items-center h-full">
      <div className="absolute right-4 top-2">
        <LogOutButton />
      </div>
      <p className="text-3xl">
        Welcome <span className="font-black">{authUser?.fullName} </span> 🌟
      </p>
      <p className="font-primary-gray">Select a chat to start messaging</p>
    </div>
  );
};
