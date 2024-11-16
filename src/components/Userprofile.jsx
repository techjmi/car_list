import { Avatar, Button, Dropdown } from 'flowbite-react';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserData, Logout } from '../service/api';
import { DataContext } from '../context/DataProvider';

const UserProfile = () => {
  const { user, setUser } = useContext(DataContext);
  const{naviagte}=useNavigate()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData(); // Get data from the backend
        setUser(userData); // Store it in state
      } catch (error) {
        console.log("User data fetch failed:", error);
        setUser(null);
      }
    };
    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await Logout();
      if (response && response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setUser(null);
        naviagte('/login')
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      {user ? (
        <Dropdown
          className="bg-white border-none shadow-none"
          arrowIcon={false}
          inline
          label={
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Avatar
                alt="User"
                img={user.profile_pic}
                rounded
                style={{ filter: 'grayscale(100%) brightness(100%)' }}
              />
            </div>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.name}</span>
            <span className="block text-sm font-medium truncate">{user.email}</span>
          </Dropdown.Header>
          {/* <Link to="/dashboard?tab=profile">
            <Dropdown.Item>Profile</Dropdown.Item>
          </Link> */}
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
      ) : (
        <Link to="/login">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};

export default UserProfile;
