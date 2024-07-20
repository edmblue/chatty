import SidebarChat from '@/components/chat/sidebar-chat';
import SearchIcon from '@/public/icons/search.svg';
import useGetConversations from '@/hooks/useGetConversations';
import useConversation from '@/zustand/useConversation';
import { FormEvent, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSocketContext } from '@/context/SocketContext';

export interface conversationProps {
  email: string;
  fullName: string;
  profilePic: string;
  username: string;
  _id: string;
}

const SidebarMenu = () => {
  const { loading, conversations } = useGetConversations();
  const { setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const [search, setSearch] = useState('');
  const [filteredConversations, setFilteredConversations] =
    useState<conversationProps[]>(conversations);

  useEffect(() => {
    let filtered = conversations;

    if (search.length >= 3) {
      filtered = conversations.filter((c: conversationProps) =>
        c.fullName.toLowerCase().includes(search.toLowerCase())
      );
    }

    const onlineConversations = filtered.filter((convo: conversationProps) =>
      onlineUsers.includes(convo._id)
    );
    const offlineConversations = filtered.filter(
      (convo: conversationProps) => !onlineUsers.includes(convo._id)
    );

    setFilteredConversations([...onlineConversations, ...offlineConversations]);
  }, [search, conversations, onlineUsers]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error('Search term must be at least 3 characters long');
    }

    const conversation = conversations.find((c: conversationProps) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else toast.error('No such user found!');
  };

  return (
    <div className="overflow-y-auto scrollbar-hide px-6 border border-t-0 border-l-gray-300">
      <form onSubmit={handleSubmit} className="py-3">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow text-sm"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </form>
      <hr className="py-2" />
      <div className="space-y-5">
        {filteredConversations.map((convo: conversationProps) => {
          return (
            <div key={convo._id}>
              <SidebarChat convo={convo} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarMenu;
