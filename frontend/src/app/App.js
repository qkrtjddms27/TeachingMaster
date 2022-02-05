import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'
import './App.scss'
import TeacherApp from './TeacherApp';
import { useEffect, useState } from 'react';
import MainPage from '../features/mainpage/MainPage';
import StudentRoom from '../features/ClassStudent/StudentRoom';
import StudentLogin from '../features/ClassStudent/StudentLogin';
import ClassTeacher from '../features/ClassTeacher/TeacherRoom';


function App() {
  const [who,setWho] = useState(localStorage.getItem("user")&&"teacher") 
  return (
    <div className='App'>
      <ChakraProvider>
        <Switch>
          <Route path="/appa" exact render={()=><StudentRoom />}/>
          <Route path="/" exact render={()=><MainPage setWho={setWho}/>}/>
          <Route path="/class/student" exact render={(props)=><StudentLogin />}/>
          <Route path="/class/teacher" exact render={(props)=><ClassTeacher/>}/>

          {/* <Route path="/class/student" exact render={(props)=><ClassStudent />}/> */}
        </Switch>
        {who ==="teacher" &&<TeacherApp setWho={setWho}/>}
      </ChakraProvider>
    </div>
  );
}

export default App;
