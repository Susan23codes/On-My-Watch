import './App.css';
import Navbar from './Components/Navbar';
import RecCardList from './Components/RecCardList';
import SingleCard from './Components/SingleCard';
import Login from './Components/Login';
import axios from 'axios'
import { Routes, Route, useNavigate, useParams, useRoutes, BrowserRouter as Router} from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'


function App() {
  const [token, setToken] = useLocalStorageState('watchToken', null)
  const [username, setUsername] = useLocalStorageState('watchUsername', '')

  const navigate = useNavigate()

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)
  }

  const handleLogout = () => {
    axios
      .post(
        'https://onmywatch.herokuapp.com/auth/token/logout/',
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() =>
        setAuth('', null)
      )
  }

  const isLoggedIn = username && token


  return (
    <>
    <Navbar 
      navigate={navigate}
      handleLogout={handleLogout}
      isLoggedIn={isLoggedIn}
      />
    <Routes>
      <Route
        path="/"
        element={<RecCardList 
          isLoggedIn={isLoggedIn}
          />}
      />
      <Route
        path="/login"
        element={<Login 
          setAuth={setAuth}
          isLoggedIn={isLoggedIn}/>}
      />
    </Routes>
    </>
  );
}

export default App;
