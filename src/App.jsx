import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { loginUser } from "./features/user/userSlice"
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { CreateTask } from './pages/CreateTask';
import { Profile } from './pages/Profile';
import { Shoutboard } from './pages/Shoutboard';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute'; 
import { useEffect } from 'react';

function App() {
  
  const dispatch = useDispatch();

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loginUser({
          userId: user.uid,
          firstName: user.displayName,
          email: user.email
        }))
      } else {
        console.log("User is not logged in.")
      }
    })
  },[])
  

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
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  )
}

export default App  
