import {Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'
import routes from './routes';
import Header from './features/teacher/Header';
import './App.scss'
import Home from './features/teacher/Home';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { setToken } from '../src/components/TOKEN'
import Login from './features/user/Login';

function App() {
  const [is_login,setIs_Login] =useState(false)
  const [user,setUser] = useState([])
  
  
  
  return (
    <div className='App'>
      <ChakraProvider>
        <Header setIs_Login={setIs_Login} is_login={is_login} user={user} setUser={setUser}/>
        <Switch>
          <Route path="/login" render={(props)=><Login setIs_Login={setIs_Login} is_login={is_login} user={user} setUser={setUser}/>}/>
          <Route path="/home" render={(props)=><Home user={user} setUser={setUser} />}/>
          {routes.map(route=>{
            return (
              <Route key={route.path} path={route.path} exact component = {route.component}/>
            )})}
        </Switch>
      </ChakraProvider>
    </div>
  );
}

export default App;
