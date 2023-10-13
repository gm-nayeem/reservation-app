import './navbar.scss';
// material icons
import {
  SearchOutlined, LanguageOutlined, DarkModeOutlined,
  FullscreenExitOutlined, NotificationsNoneOutlined, 
  ChatBubbleOutlineOutlined, ListOutlined
} from "@mui/icons-material";
import { useContext } from 'react';
import {DarkModeContext} from '../../context/darkModeContext';
import {AuthContext} from '../../context/AuthContext';

const Navbar = () => {
  const {dispatch} = useContext(DarkModeContext);
  const {user} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='Search...' />
          <SearchOutlined className='icon' />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlined className='icon' />
            English
          </div>
          <div className="item">
            <DarkModeOutlined className='icon' 
              onClick={() => dispatch({type: "TOGGLE"})}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlined className='icon' />
          </div>
          <div className="item">
            <NotificationsNoneOutlined className='icon' />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined className='icon' />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlined className='icon' />
          </div>
          <div className="item">
            <img
              src={user?.img || "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar