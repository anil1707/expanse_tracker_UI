import { configureStore } from '@reduxjs/toolkit'
import contactDetails from '../slices/userSlice'
import profileDetails from '../slices/authSlice'

const store = configureStore({
  reducer: {
    contactDetail: contactDetails,
    profile: profileDetails
  }
})


export default store;