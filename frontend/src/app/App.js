import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'
import './App.scss'
import TeacherPage from './TeacherPage';
import { useEffect, useState } from 'react';
import MainPage from '../features/mainpage/MainPage';
import ClassStudent from '../features/ClassStudent/ClassStudent';
import Classroom from '../features/ClassTeacher/Classroom'
import StudentLogin from '../features/ClassStudent/StudentLogin';


function App() {
  const [who,setWho] = useState(localStorage.getItem("user")&&"teacher") 
  return (
    <div className='App'>
      <ChakraProvider>
        <Switch>
          <Route path="/appa" exact render={()=><StudentRoom />}/>
          <Route path="/" exact render={()=><MainPage setWho={setWho}/>}/>
          <Route path="/class/student" exact render={(props)=><StudentLogin />}/>
          {/* <Route path="/class/student" exact render={(props)=><ClassStudent />}/> */}
        </Switch>
        {who ==="teacher" &&<TeacherPage setWho={setWho}/>}
      </ChakraProvider>
    </div>
  );
}

export default App;
