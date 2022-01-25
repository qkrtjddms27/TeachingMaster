import {Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'
import routes from './routes';
import Header from './components/Header'
import './App.scss'
import { useEffect } from 'react';
import axios from 'axios';
import { setToken } from './TOKEN';
function App() {
  useEffect(()=>{
    axios({
      url:"http://localhost:8080/api/v1/users/me",
      method:"GET",
      headers:setToken(),
    })
    .then(res=>{
      console.log("된다")
      console.log(res)
    })
    .catch(err=>{
      console.log("왜안되지")
      console.log(err)
    })
  },[])
  return (
    <div className='App'>
      <ChakraProvider>
        <Header/>
        <Switch>
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
