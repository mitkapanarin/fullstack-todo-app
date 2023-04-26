import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './API/userApi'
import { userSlice } from './Slices/userSlice'
import { tasksApi } from './API/tasksApi'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,  // RTK Query
    [tasksApi.reducerPath]: tasksApi.reducer,  // RTK Query
    User: userSlice.reducer, // RTK
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, tasksApi.middleware),
})

setupListeners(store.dispatch)