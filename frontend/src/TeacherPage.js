import {Route,Switch} from 'react-router-dom'
import routes from './routes';
import Header from './features/teacher/Header';
import './App.scss'
import Home from './features/teacher/Home';
import { useState,useEffect } from 'react';
import Login from './features/user/Login';

const TeacherPage = ({setWho}) => {
  const [is_login,setIs_Login] =useState(false)
  const [user,setUser] = useState({"userName":"하이","userProfile":"none"})
  useEffect(()=>{
    setWho("teacher")
    setUser(JSON.parse(localStorage.getItem("user")))
  },[])
  return ( 
    <div>
      <Header setIs_Login={setIs_Login} is_login={is_login} user={user} setUser={setUser}/>
        <Switch>
          <Route path="/login" render={(props)=><Login setIs_Login={setIs_Login} is_login={is_login} user={user} setUser={setUser}/>}/>
          <Route path="/home" render={(props)=><Home user={user} setUser={setUser} />}/>
          {routes.map(route=>{
            return (
              <Route key={route.path} path={route.path} exact component = {route.component}/>
            )})}
        </Switch>
    </div>
  )
};

export default TeacherPage;
