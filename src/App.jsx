import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { CreateTask } from './pages/CreateTask';
import { Shoutboard } from './pages/Shoutboard';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const userLoggedIn = true

  return (
    <div className="App">
        {userLoggedIn ? <Navigation /> : <Login />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createtask" element={<CreateTask />} />
          <Route path="/shoutboard" element={<Shoutboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </div>
  )
}

export default App