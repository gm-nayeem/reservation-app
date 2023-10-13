// external import
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// internal import 
import './app.scss';
// pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import NewUser from './pages/newUser/NewUser';
import NewRoom from './pages/newRoom/NewRoom';
import NewHotel from './pages/newHotel/NewHotel';
import Error from './pages/error/Error';
// components
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import './style/dark.scss';
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from './context/AuthContext';
import { userInputs } from './formSource';
import {
  userColumns, hotelColumns, roomColumns
} from './datatableSource';


const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);

  // route protected
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace/>;
    }
    return children;
  };

  return (
    <Router>

      <div className={darkMode ? "app dark" : "app"}>
        <Sidebar />

        <div className="container">
          <Navbar />

          <Routes>
            <Route path='/'>
              <Route
                path='login'
                element={!user ? <Login /> : <Navigate to="/" replace/>}
              />
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path='users'>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={userColumns}/>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=':userId'
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='new'
                  element={
                    <ProtectedRoute>
                      <NewUser inputs={userInputs} title="ADD NEW USER" />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path='hotels'>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={hotelColumns}/>
                    </ProtectedRoute>
                  } />
                <Route
                  path=':hotelId'
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='new'
                  element={
                    <ProtectedRoute>
                      <NewHotel />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path='rooms'>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={roomColumns}/>
                    </ProtectedRoute>
                  } />
                <Route
                  path=':roomId'
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='new'
                  element={
                    <ProtectedRoute>
                      <NewRoom/>
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path='*'
                element={<Error />}
              />
            </Route>
          </Routes>
        </div>

      </div>

    </Router>
  )
}

export default App
