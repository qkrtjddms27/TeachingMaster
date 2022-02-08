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
  // "teacher", "room"
  const [student,setStudent] = useState({})
  return (
    <div className='App'>
      <ChakraProvider>
        <Switch>
          <Route path="/" exact render={()=><MainPage />}/>
          
          <Route path="/class/student/login" exact render={(props)=><StudentLogin student={student} setStudent={setStudent} />}/>
          <Route path="/class/student" exact render={()=><StudentRoom student={student} setStudent={setStudent} />}/>
          <Route path="/class/teacher/:roomId" exact render={(props)=><ClassTeacher />}/>
        </Switch>
        <TeacherApp />
      </ChakraProvider>
    </div>
  );
}

export default App;
