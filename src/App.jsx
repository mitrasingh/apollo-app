import { getAuth } from 'firebase/auth';
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
import { doc, getDoc } from 'firebase/firestore'
import { db } from './utils/firebase-config';
import { getStorage, ref, getDownloadURL } from "firebase/storage"

function App() {

  const dispatch = useDispatch();
  const storage = getStorage()
  const storageRef = ref(storage)

  useEffect(() => {
    getAuth().onAuthStateChanged(async (user) => {
      try {
        const userPhotoURL = await getDownloadURL.snapshot(ref(storageRef, `user-photo/${user.uid}`)) 
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if (user && userPhotoURL && docSnap.exists()) {
          const data = docSnap.data()
          dispatch(loginUser({
            userId: user.uid,
            userPhoto: userPhotoURL,
            firstName: user.displayName,
            lastName: data.lastname, 
            title: data.title,
            email: user.email
          }))
        }
      } catch (error) {
        console.log(error.code)
      }
      }
    )})

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
