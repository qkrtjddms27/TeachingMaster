import { useEffect } from 'react';
import {Route,Switch} from 'react-router-dom'
import ClassStudent from './features/ClassStudent/ClassStudent';
const OnAir = ({setWho}) => {
  
  return (
  <div>
    <Switch>
      <Route path="/class/student" exact render={(props)=><ClassStudent />}/>
    </Switch>
  </div>
  )
};

export default OnAir;
