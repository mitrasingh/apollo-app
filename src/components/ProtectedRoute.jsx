import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { Navigation } from "./Navigation";
import { LoadAnimation } from "./LoadAnimation"
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../utils/firebase-config';
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { loginUser } from "../features/user/userSlice"
import { useDispatch } from 'react-redux';


export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const authUser = getAuth();
  const [user, loading] = useAuthState(authUser)

  const dispatch = useDispatch()
  const storage = getStorage()
  const storageRef = ref(storage)

  useEffect(() => {
    getAuth().onAuthStateChanged(async (user) => {
      if (!user) {
        signOut(auth);
      }
      try {
        if (user) {
          const userPhotoURL = await getDownloadURL(ref(storageRef, `user-photo/${user.uid}`));
          const docRef = doc(db, "users", user.uid)
          const docSnap = await getDoc(docRef)
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
    )
  }, [])


  if (loading) {
    return <LoadAnimation />
  }
  return user ? (<><Navigation />{children}</>) : (<Navigate to="/signin" state={{ from: location }} />)
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
}

