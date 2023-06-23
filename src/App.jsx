import { getAuth } from 'firebase/auth';
import { loginUser } from "./features/user/userSlice"
import { useDispatch, useSelector } from 'react-redux';
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
import { PhotoUpload } from './pages/PhotoUpload';

function App() {

  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const storage = getStorage()
  const storageRef = ref(storage)

  useEffect(() => {
    getAuth().onAuthStateChanged(async (user) => {
      try {
        const userPhotoURL = !userState.userPhoto ? null : await getDownloadURL(ref(storageRef, `user-photo/${user.uid}`))
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if (user && docSnap.exists()) {
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
        console.log(error)
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
      <Route path="photoupload" element={
        <ProtectedRoute>
          <PhotoUpload />
        </ProtectedRoute>
        } 
      />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  )
}

export default App  
