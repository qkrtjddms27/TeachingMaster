import {Route,Switch} from 'react-router-dom'
import routes from './routes';
import Header from '../features/teacher/components/Header';
import './App.scss'
import Home from '../features/teacher/Home';
import { useState,useEffect } from 'react';
import Login from '../features/user/Login';
import Settings from '../features/teacher/Settings';
import ClassTeacher from '../features/ClassTeacher/TeacherRoom'

const TeacherApp = ({header,setHeader}) => {
  const [isLogin,setisLogin] =useState(localStorage.getItem("user")===null ? false: true )
  const [user,setUser] = useState({"userName":"하이","userProfile":"none"})
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")))
  },[])

  return ( 
    <div>
      {header && <Header setisLogin={setisLogin} isLogin={isLogin} user={user} setUser={setUser}/>}
        <Switch>
          <Route path="/login" render={(props)=><Login setisLogin={setisLogin} isLogin={isLogin} user={user} setUser={setUser}/>}/>
          <Route path="/home" render={(props)=><Home setHeader={setHeader} user={user}  setUser={setUser} />}/>
          <Route path="/settings" exact render={(props)=><Settings setUser={setUser} user={user} />}/>
          <Route path="/class/teacher/:roomId" exact render={(props)=><ClassTeacher user={user} setHeader={setHeader} />}/>

          {routes.map(route=>{
            return (
              <Route key={route.path} path={route.path} exact component = {route.component}/>
            )})}
        </Switch>
    </div>
  )
};

export default TeacherApp;
