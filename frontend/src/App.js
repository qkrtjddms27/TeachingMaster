import {Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'
import routes from './routes';
import Header from './components/Header'

function App() {
  return (
    <div>
      <ChakraProvider>
        <Header/>
        {routes.map(route=>{
          return (
            <Route key={route.path} path={route.path} component = {route.component}/>
          )})}
      </ChakraProvider>
    </div>
  );
}

export default App;
