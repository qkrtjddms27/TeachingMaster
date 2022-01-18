import Settings from './features/sets/Settings';
import Login from './features/user/Login'
import Signup from './features/user/Signup'
import Home from './features/teacher/Home'
import Student from './features/student/Student'
import Folder from './features/quiz/Folder'
import Conference from './features/conference/Conference'
import Myconference from './features/conference/Myfonference'
import InFolder from './features/quiz/InFolder';
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
  },
  {
    path: "/quiz/folder",
    component: Folder,
    exact:true,
    name: "폴더보이는페이지"
  },
  {
    path: "/quiz/folder/:id",
    component: InFolder,
    name: "폴더상세페이지"
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