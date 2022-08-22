import './App.css';
import Navbar from './Components/Navbar';
import RecCardList from './Components/RecCardList';
import SingleCard from './Components/SingleCard';
import MyWatchlist from './Components/MyWatchlist';
import DetailView from './Components/DetailView';
import Login from './Components/Login';
import Watched from './Components/Watched';
import FollowUser from './Components/FollowUser';
import Registration from './Components/Registration';
import Comments from './Components/Comments';
import RecForm from './Components/RecForm';
import FollowingCard from './Components/FollowingCard';
import axios from 'axios'
import { Routes, Route, useNavigate, useParams, useRoutes, BrowserRouter as Router } from 'react-router-dom'
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
        setAuth('', null),
        navigate('/')
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

          path="/login"
          element={<Login
            setAuth={setAuth}
            isLoggedIn={isLoggedIn}
          />}
        />
        <Route
          path="/register"
          element={<Registration
            navigate={navigate}
            setAuth={setAuth}
          />}
        />
        <Route
          path="/new"
          element={<RecForm
            isLoggedIn={isLoggedIn}
            token={token}
            navigate={navigate}
            username={username}
          />

          } />

        <Route
          path="/comments/:recommendationId"
          element={<Comments
            isLoggedIn={isLoggedIn}
            token={token}
            navigate={navigate}
            username={username}
            SingleCard={SingleCard}
          />}
        />
         <Route
          path="/"
          element={<RecCardList
            isLoggedIn={isLoggedIn}
            token={token}
            navigate={navigate}
            username={username}
          />}
        />
        <Route
          path="/mywatchlist"
          element={<MyWatchlist
            isLoggedIn={isLoggedIn}
            token={token}
            navigate={navigate}
            SingleCard={SingleCard}
            username={username}
          />}
        />
        <Route
          path="/watched"
          element={<Watched
            isLoggedIn={isLoggedIn}
            token={token}
            navigate={navigate}
            SingleCard={SingleCard}
            username={username}
          />}
        />
         <Route
          path="/following"
          element={<FollowUser
            isLoggedIn={isLoggedIn}
            token={token}
            navigate={navigate}
            SingleCard={SingleCard}
            username={username}
          />}
        />
        <Route
          path="/detail/:recommendationId"
          element={<DetailView
            isLoggedIn={isLoggedIn}
            token={token}
            navigate={navigate}
            SingleCard={SingleCard}
            username={username}
          />}
        />


      </Routes>
    </>
  );
}

export default App;
