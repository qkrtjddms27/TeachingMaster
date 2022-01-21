import MainPage from './features/mainpage/MainPage';
import Settings from './features/sets/Settings';
import Login from './features/user/Login'
import Signup from './features/user/Signup'
import Home from './features/teacher/Home'
import EveryStudent from './features/student/EveryStudent'
import Folder from './features/quiz/EveryFolder'
import Conference from './features/conference/Conference'
import Myconference from './features/conference/Myfonference'
import InFolder from './features/quiz/InFolder';
import QuizDetail from './features/quiz/QuizDetail';
import QuizUpdate from './features/quiz/QuizUpdate';
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
    name: "로그인페이지",
    exact:true,
  },
  {
    path: "/signup",
    component: Signup,
    name: "회원가입페이지"
  },
  {
    path: "/settings",
    component: Settings,
    name: "세팅"
  },
  {
    path: "/students",
    component: EveryStudent,
    name: "학생목록페이지"
  },
  {
    path: "/quiz/folder",
    component: Folder,
    name: "폴더페이지",
    exact:true,
  },
  {
    path: "/quiz/folder/:id",
    component: InFolder,
    name: "폴더상세페이지",
    exact:true,

  },
  {
    path: "/quiz/:id",
    component: QuizDetail,
    name: "문제상세페이지",
    exact:true,
  },
  {
    path: "/quiz/:id/update",
    component: QuizUpdate,
    name: "문제수정페이지",
    exact:true,
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
  {
    path: "/",
    component:MainPage,
    name:'메인페이지'
  }
  
]