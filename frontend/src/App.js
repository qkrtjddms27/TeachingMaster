import {Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'
import routes from './routes';
import Header from './components/Header'
import './App.scss'

function App() {
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
