import {Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'
import routes from './routes';
import Header from './components/Header'
import './App.scss'
import Home from './features/teacher/Home';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { setToken } from './TOKEN';
import Login from './features/user/Login';

function App() {
  const [is_login,setIs_Login] =useState(false)
  const [user,setUser] = useState(["?"])
  useEffect(()=>{
    axios({
      url:"http://localhost:8080/api/v1/users/me",
      method:"GET",
      headers:setToken(),
    })
      .then(res=>{
        localStorage.setItem('user',JSON.stringify(res.data)) 
        setUser(res.data)
      })
        // 비밀번호 빼고 저장하기 object -> string으로 저장되게 하기 사용할때는 parse를 이용
      .catch(err=>{console.log(err)})
  },[is_login])
  return (
    <div className='App'>
      <ChakraProvider>
        <Header setIs_Login={setIs_Login} is_login={is_login} user={user} setUser={setUser}/>
        <Switch>
          <Route path="/login" render={(props)=><Login setIs_Login={setIs_Login} is_login={is_login} user={user} setUser={setUser}/>}/>
          <Route path="/home" render={(props)=><Home user={user} />}/>
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
