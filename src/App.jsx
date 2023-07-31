import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { CreateTask } from './pages/CreateTask';
import { Profile } from './pages/Profile';
import { Shoutboard } from './pages/Shoutboard';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute'; 
import { PhotoUpload } from './pages/PhotoUpload';
import { TopicDetails } from './pages/TopicDetails'

function App() {

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
        } 
      />
      <Route path="createtask" element={
        <ProtectedRoute>
          <CreateTask />
        </ProtectedRoute>
        } 
      />
      <Route path="shoutboard" element={
        <ProtectedRoute>
          <Shoutboard />
        </ProtectedRoute>  
        } 
      />
      <Route path="profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
        } 
      />
      <Route path="/shoutboard/:id" element={
        <ProtectedRoute>
          <TopicDetails />
        </ProtectedRoute>
        } 
      />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="photoupload" element={<PhotoUpload />} />
    </Routes>
  )
}

export default App  
