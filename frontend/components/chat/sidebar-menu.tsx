import SidebarChat from '@/components/chat/sidebar-chat';
import SearchIcon from '@/public/icons/search.svg';

const SidebarMenu = () => {
  return (
    <div className="overflow-y-auto scrollbar-hide px-6 border border-t-0 border-l-gray-300">
      <div className="py-3">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow text-sm" placeholder="Search" />
          <SearchIcon />
        </label>
      </div>
      <hr className="py-2" />
      <div className="space-y-5">
        {Array(12)
          .fill(1)
          .map((i) => {
            return (
              <div key={i}>
                <SidebarChat />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SidebarMenu;
