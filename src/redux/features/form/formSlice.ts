import { createSlice } from '@reduxjs/toolkit'

// export type Gender = 'male' | 'female' | ''
// export type Gender = GenderEnum | ''
export enum GenderEnum {
  Male = 'male',
  Female = 'female',
  Empty = '',
}

export interface FormData {
  advantages: string[]
  about: string
  checkbox: number[]
  email: string
  firstName: string
  gender: GenderEnum
  name: string
  nickname: string
  phone: string
  radio: string
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

export const checkBoxes = [
  {
    checked: false,
    name: 1,
  },
  {
    checked: false,
    name: 2,
  },
  {
    checked: false,
    name: 3,
  },
]

const initialState: FormState = {
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
}

export const formSlice = createSlice({
  initialState,
  name: 'formSlice',
  reducers: {
    nextPage: (state) => {
      if (state.formPage < 4) {
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
    setPage: (state, action) => {
      // todo add strict type number / string?
      state.formPage = +action.payload
    },
  },
})

export const { nextPage, prevPage, setFormData, setPage } = formSlice.actions
export default formSlice.reducer
