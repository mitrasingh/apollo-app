import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { CreateTask } from './pages/CreateTask';
import { Shoutboard } from './pages/Shoutboard';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const currentUser = false

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/signin" />
  }

  return (
    <div className="App">
        {currentUser && <Navigation />}
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