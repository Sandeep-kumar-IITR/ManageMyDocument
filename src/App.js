import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import SignupPage from './components/signup.js';
import Dashboard from './components/dashboard.js';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import UserContext from './allcontext.js';

function App() {
  const [logindone, setlogindone] = useState(0);
  const [loginsign, setloginsign] = useState(0);
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [createdoc, setCreatedoc] = useState(0);
  const [deleteid , setDeleteid] = useState(-1);
  return (
     <UserContext.Provider  className = "App" value={{ logindone, setlogindone,loginsign, setloginsign, user, setUser,data, setData,createdoc, setCreatedoc,deleteid, setDeleteid }}>
       
     {logindone === 0 ? (loginsign === 0 ? <Login /> : <SignupPage />) : <Dashboard />}


     </UserContext.Provider>
  
  );
}

export default App;
