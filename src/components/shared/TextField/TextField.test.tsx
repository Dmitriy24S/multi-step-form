import { render, screen } from '@testing-library/react'
import type { FieldError } from 'react-hook-form'
import { useForm, useController } from 'react-hook-form'

import { TextField } from './TextField'

test('renders TextField component with react hook form controller', () => {
  const Component = () => {
    const { control } = useForm<{
      test: string
      test1: { test: string }[]
    }>()

    useController({
      control,
      defaultValue: '',
      name: 'test',
    })

    return (
      <TextField
        name="test"
        control={control}
        errors={{}}
        placeholder="test placeholder"
      />
    )
  }

  render(<Component />)

  const input = screen.getByPlaceholderText('test placeholder')

  expect(input).toBeInTheDocument()

  // screen.debug()
})

test('TextField shows validation error message', async () => {
  const Component = () => {
    const { control } = useForm<{
      test: string
      test1: { test: string }[]
    }>()

    useController({
      control,
      defaultValue: '',
      name: 'test',
    })

    return (
      <TextField
        name="test"
        control={control}
        errors={{
          test: {
            message: 'validation error message',
          } as FieldError,
        }}
        placeholder="test placeholder"
      />
    )
  }

  render(<Component />)

  expect(screen.getByText('validation error message')).toBeInTheDocument()

  // screen.debug()
})
