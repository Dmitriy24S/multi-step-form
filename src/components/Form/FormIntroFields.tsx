import { useRef, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormGroup, Label, MaskedInput, ErrorText } from '../shared/Form'
import { TextField } from '../shared/TextField'

export const FormIntroFields = () => {
  const { formState, control, setValue } = useFormContext()
  const { errors } = formState

  const phoneInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (errors.phone) {
      phoneInputRef?.current?.focus()
    }
  }, [errors.phone])

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\s/g, '') // Remove spaces from the phone number input
    setValue('phone', inputValue) // Update the phone field value without spaces
  }

  return (
    <>
      <FormGroup>
        <Label htmlFor="phone">Phone</Label>
        <Controller
          name="phone"
          // autoFocus
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
        {errors.phone && (
          <ErrorText>{errors?.phone?.message as string}</ErrorText>
        )}
      </FormGroup>
      <TextField
        name={'email'}
        control={control}
        errors={errors}
        placeholder={'john.doe@email.com'}
        type="email"
      />
    </>
  )
}
