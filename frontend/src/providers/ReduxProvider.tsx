"use client"

import React from "react"
import { Provider } from "react-redux"
import authReducer from "@/state"
import { persistReducer, FLUSH, PURGE, REGISTER, REHYDRATE, PAUSE, PERSIST, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { configureStore } from "@reduxjs/toolkit"
import { PersistGate } from "redux-persist/integration/react"

// import createWebStorage from "redux-persist/lib/storage/createWebStorage"
// const createNoopStorage = () => {
//   return {
//     getItem(_key: any) {
//       return Promise.resolve(null)
//     },
//     setItem(_key: any, value: any) {
//       return Promise.resolve(value)
//     },
//     removeItem(_key: any) {
//       return Promise.resolve()
//     },
//   }
// }
// const storage = typeof window === "undefined" ? createNoopStorage() : createWebStorage('')

const persistConfig = { key: "root", storage, version: 1 }
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, PURGE, REGISTER, REHYDRATE, PAUSE, PERSIST] } }),
})

const ReduxProvider = ({ children }: any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch