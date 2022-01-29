import {Route,Switch} from 'react-router-dom'
import ClassStudent from './features/ClassStudent/ClassStudent';
import ClassTeacher from './features/ClassTeacher/ClassTeacher';
const OnAir = () => {
  return (
  <div>
    <Switch>
      <Route path="/class/student" render={(props)=><ClassStudent />}/>
      <Route path="/class/teacher" render={(props)=><ClassTeacher />}/>
    </Switch>
  </div>
  )
};

export default OnAir;
