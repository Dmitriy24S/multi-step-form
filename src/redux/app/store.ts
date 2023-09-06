import { configureStore } from '@reduxjs/toolkit'

// import formReducer from '@/redux/features/form/formSlice' // todo @ path
import formReducer from '../features/form/formSlice'
import authReducer from '../features/user/authSlice'
import { productApi } from '../services/products/productApi'

export const store = configureStore({
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([productApi.middleware]), // Adding the API middleware enables caching, polling, invalidation, and other essential features on RTK Query.
  reducer: {
    authState: authReducer,
    formState: formReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
