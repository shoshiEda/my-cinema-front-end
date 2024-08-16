import { useSelector } from 'react-redux';
import { Routes, Route, Navigate} from 'react-router-dom';


import MainArea from './cmps/MainArea'
import LoginPage from './cmps/LoginPage'
import MainImg from './cmps/MainImg'
import ViewUsers from './cmps/ViewUsers'
import EditUser from './cmps/EditUser'
import ViewMovies from './cmps/ViewMovies'
import EditMovie from './cmps/EditMovie'


function App() {
  
  const loggedInUser = useSelector((state) => state.systemModule.loggedInUser);
  


  return (
    <>
    <Routes>
    {loggedInUser? 
    (<>
    <Route path="/" element={<MainArea />} >
    <Route index element={<MainImg />} />
      <Route path="/" element={<MainImg/>}/>
      <Route path="/users" element={<ViewUsers/>}/>
      <Route path="/user/:id" element={<EditUser/>}/>
      <Route path="/movies" element={<ViewMovies/>}/>
      <Route path="/movie/:movieId" element={<EditMovie/>}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
   
  </>
) : (
  <>
    <Route path="/login-page" element={<LoginPage />} />
    <Route path="*" element={<Navigate to="/login-page" />} />
  </>
)}
    </Routes>
    </>
  )
}

export default App
