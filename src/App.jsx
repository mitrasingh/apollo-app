import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { CreateTask } from './pages/CreateTask';
import { Shoutboard } from './pages/Shoutboard';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const user = useSelector((state) => state.data.user.user)  

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/signin" />
  }

  return (
    <div className="App">
        {user && <Navigation />}
          <Routes>
              <Route path="/">
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route index element={<RequireAuth><Home /></RequireAuth>} />
                <Route path="createtask" element={<RequireAuth><CreateTask /></RequireAuth>} />
                <Route path="shoutboard" element={<RequireAuth><Shoutboard /></RequireAuth>} />
                <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
            </Route>
          </Routes>
    </div>
  )
}


export default App