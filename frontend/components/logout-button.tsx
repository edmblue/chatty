import LogoutIcon from '@/public/icons/logout.svg';
import useLogOut from '@/hooks/useLogOut';

const LogOutButton = () => {
  const { loading, logOutUser } = useLogOut();

  return (
    <div className="p-4 pr-6 cursor-pointer" onClick={logOutUser}>
      <LogoutIcon />
    </div>
  );
};

export default LogOutButton;
