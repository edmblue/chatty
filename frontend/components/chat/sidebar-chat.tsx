import Image from 'next/image';
import { conversationProps } from './sidebar-menu';
import useConversation from '@/zustand/useConversation';
import { useSocketContext } from '@/context/SocketContext';

interface sidebarChatProps {
  convo: conversationProps;
}

const SidebarChat = ({ convo }: sidebarChatProps) => {
  const { fullName, profilePic, _id } = convo;
  const { selectedConversation, setSelectedConversation, messages } =
    useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(_id);
  return (
    <div
      className={`flex gap-2 items-center hover:bg-primary-gray cursor-pointer px-2 py-3 rounded-md ${
        selectedConversation?._id === _id && 'bg-primary-gray'
      }`}
      onClick={() => setSelectedConversation(convo)}
    >
      <div className="relative">
        <Image src={profilePic} alt="ProfilePic" width={30} height={30} />
        <div
          className={`${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          } h-2 w-2 rounded-full absolute bottom-0`}
        />
      </div>
      <div className="text-sm w-5/6 mx-auto">
        <div className="flex justify-between w-full">
          <p className="text-gray-600 font-bold">{fullName}</p>
        </div>
        <p className="text-gray-400 line-clamp-2 text-[12px] leading-4">
          {isOnline ? 'online' : 'offline'}
        </p>
      </div>
    </div>
  );
};

export default SidebarChat;
