import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './API/userApi'
import { userSlice } from './Slices/userSlice'

export const store = configureStore({
  reducer: {

    [userApi.reducerPath]: userApi.reducer,  // RTK Query
    User: userSlice.reducer, // RTK
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

setupListeners(store.dispatch)