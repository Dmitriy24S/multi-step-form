import { yupResolver } from '@hookform/resolvers/yup'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { BrowserRouter } from 'react-router-dom'
import * as yup from 'yup'

import { renderWithProviders } from '../../utils/test-utils'
import { yupLocale } from '../../utils/yupLocale'

import type { FormIntroSchemaType } from './FormIntro'
import { FormIntro, getFormSchema } from './FormIntro'
import { FormIntroFields } from './FormIntroFields'

// set up yup errors
yup.setLocale(yupLocale)

// ---------- TestForm ----------
interface TestFormProps {
  onSubmit: (data: FormIntroSchemaType) => void
}

function TestForm({ onSubmit }: TestFormProps) {
  const schema = getFormSchema()

  const methods = useForm<FormIntroSchemaType>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormIntroFields />
        <button className="btn btn-secondary mt-2" type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  )
}

// ---------- Tests ----------
const handleSubmit = vi.fn() // jest.fn()

// const address = mockOrders[0].shippingAddress;

beforeEach(() => {
  vi.resetAllMocks() // jest.resetAllMocks()
})

describe('FormIntro', () => {
  test('renders FormIntro with phone and email inputs', async () => {
    renderWithProviders(
      <BrowserRouter>
        <FormIntro />
      </BrowserRouter>,
    )

    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()

    // screen.debug()
  })

  test('displays a validation error if validation fails', async () => {
    render(<TestForm onSubmit={handleSubmit} />)

    // Submit form with only firstName filled
    // userEvent.type(screen.getByRole('textbox', { name: /first name/i }), address.firstName, )

    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    // Expect to see validation errors
    // expect(await screen.findAllByText('Field is required')).toHaveLength(5)
    expect(await screen.findByText('Phone is required')).toBeVisible()
    expect(await screen.findByText('Email is required')).toBeVisible()
  })
})
