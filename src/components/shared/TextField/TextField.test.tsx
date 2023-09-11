import { render } from '@testing-library/react'
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
  // screen.debug()
})
