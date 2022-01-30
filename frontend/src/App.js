import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'
import './App.scss'
import TeacherPage from './TeacherPage';
import StudentPage from './StudentPage';
import { useEffect, useState } from 'react';
import MainPage from './features/mainpage/MainPage';
function App() {
  const [who,setWho] = useState("anon")
  
  return (
    <div className='App'>
      <ChakraProvider>
        {who ==="anon" && <Route path="/" exact render={()=><MainPage setWho={setWho}/>}/>}  
        {who ==="teacher" &&<TeacherPage setWho={setWho}/>}
        {who ==="student" &&<StudentPage setWho={setWho}/>}  
      </ChakraProvider>
    </div>
  );
}

export default App;
