const SidebarChat = () => {
  return (
    <div className="flex gap-2 items-center hover:bg-primary-gray cursor-pointer px-2 py-3 rounded-md">
      <div className="relative">
        <div className="bg-gray-300 h-8 w-8 rounded-full" />
        <div className="bg-green-500 h-2 w-2 rounded-full absolute bottom-0" />
      </div>
      <div className="text-sm w-5/6 mx-auto">
        <div className="flex justify-between w-full">
          <p className="text-gray-600 font-bold">Jane Doe</p>
          <p className="text-gray-400 text-[12px]">7:30am</p>
        </div>
        <p className="text-gray-400 line-clamp-2 text-[12px] leading-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          deserunt sapiente delectus aliquam a expedita, magnam aut tempore ex
          laboriosam inventore ad veniam dolores veritatis. Odit odio quis
          eligendi quo.
        </p>
      </div>
    </div>
  );
};

export default SidebarChat;
