import { createSlice } from '@reduxjs/toolkit'

export interface FormData {
  email: string
  firstName: string
  name: string
  nickname: string
  phone: string
  surname: string
}

interface Link {
  name: string
  url: string
}

interface FormState {
  formPage: number
  links: Link[]
  formData: FormData
}

const initialState: FormState = {
  formData: {
    email: '',
    firstName: '',
    name: 'John Doe',
    nickname: '',
    phone: '',
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
}

export const formSlice = createSlice({
  initialState,
  name: 'formSlice',
  reducers: {
    nextPage: (state) => {
      if (state.formPage < 3) {
        state.formPage += 1
      }
    },
    prevPage: (state) => {
      if (state.formPage > 1) {
        state.formPage -= 1
      }
    },
    setFormData: (state, action) => {
      const data = action.payload as Partial<FormData>
      state.formData = { ...state.formData, ...data }
    },
  },
})

export const { nextPage, prevPage, setFormData } = formSlice.actions
export default formSlice.reducer
