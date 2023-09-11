import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { camelize, capitalize } from '../../../lib'
import { ErrorText, FormGroup, Input, Label } from '../Form'

interface Props {
  name: string
  control: Control<any>
  errors: FieldErrors<any>
  placeholder?: string
  type?: string
}

export const TextField = ({
  name,
  control,
  errors,
  placeholder = '',
  type = 'text',
}: Props) => {
  return (
    <FormGroup>
      <Label htmlFor={camelize(name)}>{capitalize(name)}</Label>
      <Controller
        name={camelize(name)}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id={camelize(name)}
            type={type}
            placeholder={placeholder}
          />
        )}
      />
      {errors[name] && <ErrorText>{errors[name]?.message as string}</ErrorText>}
    </FormGroup>
  )
}
