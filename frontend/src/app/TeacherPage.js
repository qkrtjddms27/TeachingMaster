import {Route,Switch} from 'react-router-dom'
import routes from './routes';
import Header from '../features/teacher/components/Header';
import './App.scss'
import Home from '../features/teacher/Home';
import { useState,useEffect } from 'react';
import Login from '../features/user/Login';
import ClassTeacher from '../features/ClassTeacher/ClassTeacher';
import Settings from '../features/teacher/Settings';

const TeacherPage = () => {
  const [isLogin,setisLogin] =useState(localStorage.getItem("user")===null ? false: true )
  const [user,setUser] = useState({"userName":"하이","userProfile":"none"})
  const [onAir,setOnAir] = useState(false)
  useEffect(()=>{
    setOnAir(false)
  },[])
  return ( 
    <div>
      <Header setisLogin={setisLogin} isLogin={isLogin} user={user} setUser={setUser}/>
        <Switch>
          <Route path="/login" render={(props)=><Login setisLogin={setisLogin} isLogin={isLogin} user={user} setUser={setUser}/>}/>
          <Route path="/home" render={(props)=><Home user={user} setOnAir={setOnAir} setUser={setUser} />}/>
          <Route path="/settings" exact render={(props)=><Settings setUser={setUser} user={user} />}/>
          {routes.map(route=>{
            return (
              <Route key={route.path} path={route.path} exact component = {route.component}/>
            )})}
        </Switch>
    </div>
  )
};

export default TeacherPage;
