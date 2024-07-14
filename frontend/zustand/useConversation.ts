import { create } from 'zustand';
import { conversationProps } from '@/components/chat/sidebar-menu';

interface ConversationState {
  selectedConversation: conversationProps | null;
  setSelectedConversation: (
    selectedConversation: conversationProps | null
  ) => void;
  messages: MessagesProps[];
  setMessages: (messages: MessagesProps[]) => void;
}

export interface MessagesProps {
  createdAt: string;
  message: string;
  receiverId: string;
  senderId: string;
  updatedAt: string;
  _id: string;
}
const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: any) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages: any) => set({ messages }),
}));

export default useConversation;
