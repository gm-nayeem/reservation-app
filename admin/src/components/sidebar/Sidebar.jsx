import './sidebar.scss';
import { Link, useNavigate } from 'react-router-dom';

// material icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
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
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className='title'>LISTS</p>
          <Link to="/users" className='linkStyle'>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/hotels" className='linkStyle'>
            <li>
              <StoreIcon className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/rooms" className='linkStyle'>
            <li>
              <CreditCardIcon className="icon" />
              <span>Rooms</span>
            </li>
          </Link>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className='title'>USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className='title'>SERVICES</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className='title'>USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
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

export default Sidebar