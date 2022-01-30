import {Route,Switch} from 'react-router-dom'
import routes from './routes';
import Header from './features/teacher/Header';
import './App.scss'
import Home from './features/teacher/Home';
import { useState,useEffect } from 'react';
import Login from './features/user/Login';
import ClassTeacher from './features/ClassTeacher/ClassTeacher';

const TeacherPage = ({setWho}) => {
  const [is_login,setIs_Login] =useState(false)
  const [user,setUser] = useState({"userName":"하이","userProfile":"none"})
  const [onAir,setOnAir] = useState(false)
  useEffect(()=>{
    setWho("teacher")
  },[])
  return ( 
    <div>
      {!onAir && <Header setIs_Login={setIs_Login} is_login={is_login} user={user} setUser={setUser}/>}
        <Switch>
          <Route path="/login" render={(props)=><Login setIs_Login={setIs_Login} is_login={is_login} user={user} setUser={setUser}/>}/>
          <Route path="/home" render={(props)=><Home user={user} setOnAir={setOnAir} setUser={setUser} />}/>
          {routes.map(route=>{
            return (
              <Route key={route.path} path={route.path} exact component = {route.component}/>
            )})}
          <Route path="/class/teacher" exact render={(props)=><ClassTeacher setWho={setWho} />}/>

        </Switch>
    </div>
  )
};

export default TeacherPage;
