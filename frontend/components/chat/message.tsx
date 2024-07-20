import { MessagesProps } from '@/zustand/useConversation';
import useConversation from '@/zustand/useConversation';
import { extractTime } from '@/utils/extractTime';
import useListenMessages from '@/hooks/useListenMessages';

interface MessageCompProps {
  msj: MessagesProps;
}

const Message = ({ msj }: MessageCompProps) => {
  const { selectedConversation } = useConversation();
  const { senderId, message, createdAt } = msj;
  const owner = senderId != selectedConversation?._id;
  const shake = msj.shouldShake && 'shake';

  useListenMessages();

  return (
    <div>
      <div className={`chat ${owner ? 'chat-end ' : 'chat-start'}`}>
        <div
          className={`chat-bubble ${
            owner
              ? 'chat-end bg-primary-gray text-gray-700'
              : 'chat-start bg-secundary-gray text-gray-900'
          } ${shake}`}
        >
          {message}
        </div>
        <div className="chat-footer opacity-50 text-[10px]">
          {extractTime(createdAt)}{' '}
        </div>
      </div>
    </div>
  );
};

export default Message;
