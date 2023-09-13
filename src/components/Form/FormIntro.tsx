import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { AiOutlineLink } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import validator from 'validator'
import * as yup from 'yup'

import { MOBILE_VIEWPORT } from '../../common/const'
import { useAppDispatch, useAppSelector } from '../../redux/app'
import type { FormData } from '../../redux/features/form/formSlice'
import { nextPage, setFormData } from '../../redux/features/form/formSlice'
import { Button } from '../shared/Button'
import { Form, Header, Link, List, ListItem } from '../shared/Form'

import { FormIntroFields } from './FormIntroFields'

export interface FormIntroSchemaType {
  email: string
  phone: string
}

export const getFormSchema = () =>
  yup.object().shape({
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

const formSchema = getFormSchema()

export const FormIntro = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.formState.formData)
  const links = useAppSelector((state) => state.formState.links)

  const nameShort = formData?.name
    .split(' ')
    .map((word) => word[0])
    .join('')

  const methods = useForm<FormIntroSchemaType>({
    defaultValues: {
      email: formData.email,
      phone: formData.phone,
    },
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  })

  const onSubmit = async (data: Partial<FormData>) => {
    // data {email: 'dd@dd', phone: '7888888999'}
    dispatch(setFormData(data))
    dispatch(nextPage())
    navigate('/create')
  }

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
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormIntroFields />
          <Button type="submit">Start</Button>
        </Form>
      </FormProvider>
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
