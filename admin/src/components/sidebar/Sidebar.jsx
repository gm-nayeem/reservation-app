import './sidebar.scss';
import { Link, useNavigate } from 'react-router-dom';

// material icons
import {
  Dashboard, PersonOutline, LocalShipping, CreditCard,
  InsertChart, Store, SettingsApplications, ExitToApp,
  NotificationsNone, SettingsSystemDaydreamOutlined,
  PsychologyOutlined, AccountCircleOutlined
} from "@mui/icons-material";
import { useContext } from 'react';
import {DarkModeContext} from '../../context/darkModeContext'
import {AuthContext} from "../../context/AuthContext"

const Sidebar = () => {
  const {dispatch} = useContext(DarkModeContext);
  const {dispatch: userDispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  // handle logout 
  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className='sidebar'>
      <div className="top">
        <Link to="/" className='linkStyle'>
          <span className="logo">Mernadmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className='title'>MAIN</p>
          <Link to="/" className='linkStyle'>
            <li>
              <Dashboard className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className='title'>LISTS</p>
          <Link to="/users" className='linkStyle'>
            <li>
              <PersonOutline className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/hotels" className='linkStyle'>
            <li>
              <Store className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/rooms" className='linkStyle'>
            <li>
              <CreditCard className="icon" />
              <span>Rooms</span>
            </li>
          </Link>
          <li>
            <LocalShipping className="icon" />
            <span>Delivery</span>
          </li>
          <p className='title'>USEFUL</p>
          <li>
            <InsertChart className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNone className="icon" />
            <span>Notifications</span>
          </li>
          <p className='title'>SERVICES</p>
          <li>
            <SettingsSystemDaydreamOutlined className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlined className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplications className="icon" />
            <span>Settings</span>
          </li>
          <p className='title'>USER</p>
          <li>
            <AccountCircleOutlined className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToApp className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div 
          className="colorOption" 
          onClick={() => dispatch({type: "LIGHT"})}
        ></div>
        <div 
          className="colorOption" 
          onClick={() => dispatch({type: "DARK"})}
        ></div>
      </div>
    </div>
  )
}

export default Sidebar;