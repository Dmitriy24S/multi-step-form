import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AiOutlineLink } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import validator from 'validator'
import * as yup from 'yup'

import { MOBILE_VIEWPORT } from '../../common/const'
import { useAppDispatch, useAppSelector } from '../../redux/app'
import type { FormData } from '../../redux/features/form/formSlice'
import { nextPage, setFormData } from '../../redux/features/form/formSlice'
import { Button } from '../shared/Button/Button'
import {
  ErrorText,
  Form,
  FormGroup,
  Header,
  Input,
  Label,
  Link,
  List,
  ListItem,
  MaskedInput,
} from '../shared/Form/Form'

const formSchema = yup.object().shape({
  // .email('Invalid email format'),
  email: yup
    .string()
    .required('Email is required')
    .test('is-email', 'Invalid email format', (value) =>
      validator.isEmail(value),
    ),
  phone: yup
    .string()
    .matches(/^7\d{9}$/, 'Wrong phone format. e.g. +7 543 210 000')
    .required('Phone is required'),
})

export const FormIntro = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.formState.formData)
  const links = useAppSelector((state) => state.formState.links)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: formData.email,
      phone: formData.phone,
    },
    resolver: yupResolver(formSchema),
  })

  const nameShort = formData?.name
    .split(' ')
    .map((word) => word[0])
    .join('')

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\s/g, '') // Remove spaces from the phone number input
    setValue('phone', inputValue) // Update the phone field value without spaces
  }

  const onSubmit = async (data: Partial<FormData>) => {
    // data {email: 'dd@dd', phone: '7888888999'}
    dispatch(setFormData(data))
    dispatch(nextPage())
    navigate('/create')
  }

  const phoneInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (errors.phone) {
      phoneInputRef?.current?.focus()
    }
  }, [errors.phone])

  return (
    <>
      <Header>
        <Logo>{nameShort}</Logo>
        <HeaderDetails>
          <Name>{formData.name}</Name>
          <List>
            {links.map((link) => (
              <ListItem key={link.name}>
                <Link href={link.url}>
                  <AiOutlineLink /> {link.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </HeaderDetails>
      </Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="text"
                placeholder="john.doe@email.com"
              />
            )}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </FormGroup>
        <Button type="submit">Start</Button>
      </Form>
    </>
  )
}

const Name = styled.h4`
  font-size: 1.9rem;
  font-weight: 600;
`

const HeaderDetails = styled.div`
  @media (min-width: ${MOBILE_VIEWPORT}) {
    margin-left: 1rem;
  }
`

const Logo = styled.div`
  border-radius: 50%;
  background-color: pink;
  color: #181529;
  font-weight: 700;
  font-size: 1.3rem;
  pointer-events: none;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
