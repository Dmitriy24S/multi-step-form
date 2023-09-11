import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IoCloseSharp } from 'react-icons/io5'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../redux/app'
import {
  GenderEnum,
  checkBoxes,
  nextPage,
  prevPage,
  setFormData,
} from '../../redux/features/form/formSlice'
import type { FormData } from '../../redux/features/form/formSlice'
import { Button, FormNavigationButtonContainer } from '../shared/Button'
import {
  ErrorText,
  Form,
  FormGroup,
  Input,
  Textarea,
  Label,
  Select,
  RadioGroup,
  CheckboxGroup,
} from '../shared/Form'

const formSchema = yup.object().shape({
  about: yup
    .string()
    .required('About is required')
    .min(1, 'About must be atleast 1 character')
    .max(200, 'About must be at most 200 characters'),
  advantages: yup
    .array()
    .of(yup.string().required('Advantage is required'))
    .required('Advantages are required'),
  checkbox: yup
    .array()
    .min(1, 'Must select atleast one value')
    .of(yup.number().required('Checkbox item is required'))
    .required('Checkbox is required'),
  gender: yup
    .string()
    .oneOf(Object.values(GenderEnum))
    .required('Gender is required'),
  radio: yup.string().required('Radio is required'),
})

export const FormPage2 = () => {
  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.formState.formData)
  const [advantages, setAdvantages] = useState(formData.advantages)
  const [checkboxState, setCheckboxState] = useState(formData.checkbox)

  const addAdvantageField = () => {
    setAdvantages([...advantages, ''])
  }

  const removeAdvantageField = (index: number) => {
    const updatedAdvantages = advantages.filter((_adv, idx) => index !== idx)
    setValue('advantages', updatedAdvantages)
    setAdvantages(updatedAdvantages)
    console.log('updatedAdvantages', updatedAdvantages)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      about: formData.about,
      advantages: advantages,
      checkbox: checkboxState,
      gender: formData.gender,
      radio: formData.radio,
    },
    resolver: yupResolver(formSchema),
  })

  const onSubmit = async (data: Partial<FormData>) => {
    console.log('data', data)

    dispatch(setFormData(data))
    dispatch(nextPage())
  }

  const AboutCharLength = watch('about').replace(/\s+/g, '').length

  const advantageswatch = watch('advantages')
  console.log('advantageswatch:', advantageswatch)

  const checkboxwatch = watch('checkbox')
  console.log('checkboxwatch:', checkboxwatch)

  const genderwatch = watch('gender')
  console.log('genderwatch:', genderwatch)

  useEffect(() => {
    console.log('formData redux', formData)
  }, [formData])

  useEffect(() => {
    console.log('advantages', advantages)
  }, [advantages])

  useEffect(() => {
    console.log('checkboxState', checkboxState)
    setValue('checkbox', checkboxState)
  }, [checkboxState])

  const formValues = getValues()

  useEffect(() => {
    console.log('formValues', formValues)
  }, [formValues])

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="Advantages">Advantages</Label>
          {advantages?.map((advantage, index) => {
            console.log('.map advantege', advantage)

            return (
              <Fragment key={index}>
                <div className="flex gap-2 mb-2">
                  <Controller
                    // name={`advantages[${index}]`}
                    name="advantages"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        // autoFocus
                        type="text"
                        placeholder={`Advantage ${index + 1}`}
                        value={advantage}
                        onChange={(e) => {
                          const value = e.target.value
                          const updatedAdvantages = advantages.map(
                            (advantage, idx) => {
                              if (idx === index) {
                                return value
                              }
                              return advantage
                            },
                          )
                          setAdvantages(updatedAdvantages)
                          setValue('advantages', updatedAdvantages)
                        }}
                      />
                    )}
                  />
                  <Button
                    $sm
                    disabled={advantages.length === 1}
                    type="button"
                    onClick={() => removeAdvantageField(index)}
                    className="!mt-0 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <IoCloseSharp />
                  </Button>
                </div>
                {errors.advantages && (
                  <ErrorText className="mb-3">
                    {errors?.advantages[index]?.message}
                  </ErrorText>
                )}
              </Fragment>
            )
          })}
          <div className="flex flex-wrap gap-4">
            {errors.advantages && (
              <ErrorText>{errors.advantages.message}</ErrorText>
            )}
            <Button
              type="button"
              onClick={addAdvantageField}
              className="ml-auto !mt-1"
            >
              +
            </Button>
          </div>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="gender">Gender</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              // <Select {...field} id="gender" value="">
              // <Select {...field} id="gender" defaultValue="">
              <Select {...field} id="gender">
                <option value="" disabled selected>
                  choose gender...
                </option>
                <option value={GenderEnum.Male}>{GenderEnum.Male}</option>
                <option value={GenderEnum.Female}>{GenderEnum.Female}</option>
              </Select>
            )}
          />
          {errors.gender && <ErrorText>{errors.gender.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="radio">Radio</Label>
          <Controller
            name="radio"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup>
                  <input
                    type="radio"
                    {...field}
                    value="one"
                    id="one"
                    checked={field.value === 'one'}
                  />
                  <label htmlFor="one">One</label>
                </RadioGroup>
                <RadioGroup>
                  <input
                    type="radio"
                    {...field}
                    value="two"
                    id="two"
                    checked={field.value === 'two'}
                  />
                  <label htmlFor="two">Two</label>
                </RadioGroup>
                <RadioGroup>
                  <input
                    type="radio"
                    {...field}
                    value="three"
                    id="three"
                    checked={field.value === 'three'}
                  />
                  <label htmlFor="three">Three</label>
                </RadioGroup>
              </>
            )}
          />
          {errors.radio && <ErrorText>{errors.radio.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="checkbox">Checkbox</Label>
          {checkBoxes.map((checkbox) => {
            return (
              <Controller
                key={checkbox.name}
                name="checkbox"
                control={control}
                render={({ field }) => {
                  // console.log('field', field)
                  // {name: 'checkbox', value: Array(0), onChange: ƒ, onBlur: ƒ, ref: ƒ}
                  // name: "checkbox"
                  // onBlur: () => {…}
                  // onChange: (event) => {…}
                  // ref: (elm) => {…}
                  // value: [] //  value: true
                  return (
                    <>
                      <CheckboxGroup>
                        <input
                          type="checkbox"
                          {...field}
                          value={checkbox.name}
                          checked={field.value.includes(checkbox.name)}
                          id={String(checkbox.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCheckboxState((state) => [
                                ...state,
                                +e.target.value,
                              ])
                            } else {
                              setCheckboxState((state) =>
                                state.filter(
                                  (number) => number !== +e.target.value,
                                ),
                              )
                            }
                            // setValue('checkbox', checkboxState) // ! not in sync / delayed ?
                          }}
                        />
                        <label htmlFor={String(checkbox.name)}>
                          {checkbox.name}
                        </label>
                      </CheckboxGroup>
                    </>
                  )
                }}
              />
            )
          })}
          {errors.checkbox && <ErrorText>{errors.checkbox.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="about">About</Label>
          <Controller
            name="about"
            control={control}
            render={({ field }) => (
              <Textarea {...field} id="about" placeholder="e.g. about" />
            )}
          />
          <div className="flex flex-wrap flex-row-reverse gap-4">
            <p className="text-sm text-slate-500 ml-auto mt-1">
              {AboutCharLength} / 200
            </p>
            {errors.about && <ErrorText>{errors.about.message}</ErrorText>}
          </div>
        </FormGroup>

        <FormNavigationButtonContainer>
          <Button type="button" onClick={() => dispatch(prevPage())}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </FormNavigationButtonContainer>
      </Form>
    </div>
  )
}
