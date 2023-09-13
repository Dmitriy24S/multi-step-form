import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { Provider } from 'react-redux'

import type { RootState } from '../redux/app'
import formReducer, { GenderEnum } from '../redux/features/form/formSlice'
import authReducer from '../redux/features/user/authSlice'
import { productApi } from '../redux/services/products/productApi'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: any
  // store?: AppStore
  // store?: RootState
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      authState: {},
      formState: {
        formData: {
          about: '',
          advantages: [''],
          checkbox: [],
          email: '',
          firstName: '',
          gender: GenderEnum.Empty,
          name: 'John Doe',
          nickname: '',
          phone: '',
          radio: '',
          surname: '',
        },
        formPage: 1,
        links: [
          {
            name: 'LinkedIn',
            url: '/',
          },
          {
            name: 'GitHub',
            url: '/',
          },
          {
            name: 'Resume',
            url: '/',
          },
        ],
      },
      productApi: {} as any,
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      preloadedState,
      reducer: {
        authState: authReducer,
        formState: formReducer,
        [productApi.reducerPath]: productApi.reducer,
      },
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
