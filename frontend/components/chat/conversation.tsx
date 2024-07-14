import LogOutButton from '../logout-button';
import SendIcon from '@/public/icons/send.svg';
import Message from '@/components/chat/message';
import { conversationProps } from './sidebar-menu';
import { FormEvent, useEffect, useRef, useState } from 'react';
import useSendMessage from '@/hooks/useSendMessage';
import useGetMessages from '@/hooks/useGetMessages';
import Spinner from '../spinner';

interface ConversationCompProps {
  convo: conversationProps;
}

const Conversation = ({ convo }: ConversationCompProps) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useSendMessage({ message, setMessage });

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { messages, loading } = useGetMessages();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await sendMessage();
  };
  return (
    <>
      <div className="border-0 border-b-[1px] flex justify-between items-center">
        <div className="flex gap-2 lg:w-1/3 padding-container items-center px-2 py-4 rounded-md">
          <div className="bg-gray-300 h-8 w-8 rounded-full" />
          <div className="text-sm w-5/6 mx-auto">
            <p className="text-gray-600 font-bold">{convo.fullName}</p>
            <p className="text-gray-400 line-clamp-2 text-[12px] leading-4">
              Conectado
            </p>
          </div>
        </div>
        <LogOutButton />
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="padding-container scrollbar-hide overflow-y-auto  py-3">
          {loading ? (
            <Spinner />
          ) : messages.length === 0 ? (
            <div className="text-center text-sm passing-container">
              Send a message to start a conversation
            </div>
          ) : (
            messages.map((msj) => (
              <div key={msj._id} ref={lastMessageRef}>
                <Message msj={msj} />
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit} className="py-2 px-1 mt-auto">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow text-sm"
              placeholder="Send a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="h-4 w-4">
              <SendIcon />
            </button>
          </label>
        </form>
      </div>
    </>
  );
};

export default Conversation;
