import Settings from './features/sets/Settings';
import Login from './features/user/Login'
import Signup from './features/user/Signup'
import Home from './features/teacher/Home'
import Student from './features/student/Student'
import Quiz from './features/quiz/Quiz'
import Conference from './features/conference/Conference'
import Myconference from './features/conference/Myfonference'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/home",
    component: Home,
    name: "내홈페이지"
  },
  {
    path: "/login",
    component: Login,
    name: "Login"
  },
  {
    path: "/signup",
    component: Signup,
    name: "Signup"
  },
  {
    path: "/settings",
    component: Settings,
    name: "Settings"
  },
  {
    path: "/student",
    component: Student,
    name: "student"
  },{
    path: "/quiz",
    component: Quiz,
    name: "내홈페이지"
  },
  {
    path: "/conference",
    component: Conference,
    name: "Conference"
  },
  {
    path: "/myconference",
    component: Myconference,
    name: "myconference"
  },
  
]