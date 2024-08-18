import { useSelector } from 'react-redux';

import MainArea from './cmps/MainArea'
import LoginPage from './cmps/LoginPage'


function App() {
  
  const loggedInUser = useSelector((state) => state.systemModule.loggedInUser);
  


  return (
    <>
    {loggedInUser? <MainArea/> : <LoginPage /> }
    </>
  )
}

export default App
