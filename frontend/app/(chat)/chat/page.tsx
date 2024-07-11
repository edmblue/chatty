'use client';

import { useState } from 'react';
import Conversation from '@/components/chat/conversation';
import SidebarMenu from '@/components/chat/sidebar-menu';

const ChatApp = () => {
  const [noChat, setNoChat] = useState(true);
  return (
    <div className="grid grid-cols-4 h-screen overflow-hidden">
      <SidebarMenu />
      <div className="col-span-3 flex flex-col h-screen">
        {noChat ? <NoSelectedChat /> : <Conversation />}
      </div>
    </div>
  );
};

export default ChatApp;

const NoSelectedChat = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      <p className="text-3xl">
        Welcome <span className="font-black">Raquel</span> 🌟
      </p>
      <p className="font-primary-gray">Select a chat to start messaging</p>
    </div>
  );
};
