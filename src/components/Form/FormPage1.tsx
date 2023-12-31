import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import validator from 'validator'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../redux/app'
import {
  nextPage,
  prevPage,
  setFormData,
} from '../../redux/features/form/formSlice'
import type { FormData } from '../../redux/features/form/formSlice'
import { FormNavigationButtonContainer, Button } from '../shared/Button'
import { ErrorText, Form, FormGroup, Label, MaskedInput } from '../shared/Form'
import { TextField } from '../shared/TextField'

const formSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    // .email('Invalid email format'),
    // .test((value) => validator.isEmail(value)),
    .test('is-email', 'Invalid email format', (value) =>
      validator.isEmail(value),
    ),
  firstName: yup
    .string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'Only letters allowed')
    .min(1, 'First name must be atleast 1 character')
    .max(50, 'First name must be at most 30 characters'),
  nickname: yup
    .string()
    .required('Nickname is required')
    .max(30, 'Nickname must be at most 30 characters')
    .min(1, 'Nickname must be atleast 1 character')
    .matches(/^[a-zA-Z0-9]*$/, 'Only letters and numbers are allowed'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^7\d{9}$/, 'Wrong phone format. e.g. +7 543 210 000'),
  surname: yup
    .string()
    .required('Surname is required')
    .matches(/^[A-Za-z]+$/, 'Only letters allowed')
    .min(1, 'Surname must be atleast 1 character')
    .max(50, 'Surname must be at most 30 characters'),
})

export const FormPage1 = () => {
  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.formState.formData)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: formData.email,
      firstName: formData.firstName,
      nickname: formData.nickname,
      phone: formData.phone,
      surname: formData.surname,
    },
    resolver: yupResolver(formSchema),
  })

  const onSubmit = async (data: Partial<FormData>) => {
    // {
    // "email": "do@do.co",
    // "firstName": "do",
    // "nickname": "do",
    // "phone": "7555555555",
    // "surname": "do"
    // }
    dispatch(setFormData(data))
    dispatch(nextPage())
  }

  // Phone input
  const phoneInputRef = useRef<HTMLInputElement>(null)

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\s/g, '') // Remove spaces from the phone number input
    setValue('phone', inputValue) // Update the phone field value without spaces
  }

  useEffect(() => {
    if (errors.phone) {
      phoneInputRef?.current?.focus()
    }
  }, [errors.phone])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name={'nickname'}
        control={control}
        errors={errors}
        placeholder={'e.g. Nickname'}
        type="text"
      />
      <TextField
        name={'first Name'}
        control={control}
        errors={errors}
        placeholder={'e.g. First Name'}
        type="text"
      />
      <TextField
        name={'surname'}
        control={control}
        errors={errors}
        placeholder={'e.g. Surname'}
        type="text"
      />

      <FormGroup>
        <Label htmlFor="phone">Phone</Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <MaskedInput
              mask="9 999 999 999"
              maskChar=""
              value={field.value}
              // onChange={field.onChange}
              onChange={handlePhoneInputChange}
            >
              {
                ((inputProps: any) => {
                  return (
                    <input
                      {...inputProps}
                      id="phone"
                      ref={phoneInputRef}
                      type="text"
                      placeholder="+7 543 210 000"
                    />
                  )
                }) as unknown as React.ReactNode
              }
            </MaskedInput>
          )}
        />
        {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
      </FormGroup>

      <TextField
        name={'email'}
        control={control}
        errors={errors}
        placeholder={'john.doe@email.com'}
        type="email"
      />

      <FormNavigationButtonContainer>
        <Button type="button" onClick={() => dispatch(prevPage())}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </FormNavigationButtonContainer>
    </Form>
  )
}
