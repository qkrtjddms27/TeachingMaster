import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'
import './App.scss'
import TeacherPage from './TeacherPage';
import StudentPage from './StudentPage';
import { useState } from 'react';
import MainPage from './features/mainpage/MainPage';
function App() {
  const [who,setWho] = useState("anon")
  return (
    <div className='App'>
      <ChakraProvider>
        {who ==="anon" && <Route path="/" render={(props)=><MainPage setWho={setWho}/>}/>}  
        {who ==="teacher" &&<TeacherPage/>}
        {who ==="student" &&<StudentPage/>}
        
      </ChakraProvider>
    </div>
  );
}

export default App;
