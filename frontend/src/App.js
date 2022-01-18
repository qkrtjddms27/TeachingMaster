import {Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Settings from './features/settings/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div>
      <ChakraProvider>
        <Navbar/>
        <h1>하이</h1>
        <Route path="/settings" exact component={Settings}></Route>
      </ChakraProvider>
    </div>
  );
}

export default App;
