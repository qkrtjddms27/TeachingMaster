// import Login from './features/user/Login'
// import Home from './features/teacher/Home'
import MainPage from '../features/mainpage/MainPage';
import Settings from '../features/teacher/Settings';
import Signup from '../features/user/Signup'
import EveryStudent from '../features/student/EveryStudent'
import Folder from '../features/quiz/EveryFolder'
import ConferenceLog from '../features/teacher/ConferenceLog'
import InFolder from '../features/quiz/InFolder';
import Updatequiz from '../features/quiz/Updatequiz';
import Createquiz from '../features/quiz/Createquiz';
import ClassTeacher from '../features/ClassTeacher/TeacherRoom';
import OnAir from '../features/onair/OnAir';
// eslint-disable-next-line import/no-anonymous-default-export
export default [

  {
    path: "/signup",
    component: Signup,
    name: "회원가입페이지"
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
    path: "/quiz/folder/:thisFolder",
    component: InFolder,
    name: "폴더상세페이지",
    exact:true,
  },
  {
    path: "/quiz/create",
    component: Createquiz,
    name: "폴더생성페이지",
    exact:true,
  },
  {
    path: "/quiz/:id/update",
    component: Updatequiz,
    name: "문제수정페이지",
    exact:true,
  },
  {
    path: "/conferenceLog",
    component: ConferenceLog,
    name: "내 회의 로그"
  },
  {
    path: "/onair",
    component: OnAir,
    name: "수업중인반"
  },
]