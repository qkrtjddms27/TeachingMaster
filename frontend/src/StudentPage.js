import { useEffect } from 'react';
import {Route,Switch} from 'react-router-dom'
import ClassStudent from './features/ClassStudent/ClassStudent';
import ClassTeacher from './features/ClassTeacher/ClassTeacher';
const OnAir = ({setWho}) => {
  
  return (
  <div>
    <Switch>
      <Route path="/class/student" exact render={(props)=><ClassStudent />}/>
      <Route path="/class/teacher" exact render={(props)=><ClassTeacher setWho={setWho} />}/>
    </Switch>
  </div>
  )
};

export default OnAir;
