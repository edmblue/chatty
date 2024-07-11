import LogoutIcon from '@/public/icons/logout.svg';
import Message from '@/components/chat/message';

const Conversation = () => {
  return (
    <>
      <div className="border-0 border-b-[1px] flex justify-between items-center">
        <div className="flex gap-2 lg:w-1/3 padding-container items-center px-2 py-4 rounded-md">
          <div className="bg-gray-300 h-8 w-8 rounded-full" />
          <div className="text-sm w-5/6 mx-auto">
            <p className="text-gray-600 font-bold">Jane Doe</p>
            <p className="text-gray-400 line-clamp-2 text-[12px] leading-4">
              Conectado
            </p>
          </div>
        </div>
        <div className="p-4 pr-6 cursor-pointer">
          <LogoutIcon />
        </div>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="padding-container scrollbar-hide overflow-y-auto  py-3">
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <div className="py-2 px-1 mt-auto">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow text-sm"
              placeholder="Send a message"
            />
            <LogoutIcon />
          </label>
        </div>
      </div>
    </>
  );
};

export default Conversation;
