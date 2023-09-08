import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IoCloseSharp } from 'react-icons/io5'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../redux/app'
import {
  SexEnum,
  nextPage,
  prevPage,
  setFormData,
} from '../../redux/features/form/formSlice'
import type { FormData } from '../../redux/features/form/formSlice'
import { Button, FormNavigationButtonContainer } from '../shared/Button/Button'
import {
  ErrorText,
  Form,
  FormGroup,
  Input,
  Textarea,
  Label,
  Select,
  RadioGroup,
} from '../shared/Form/Form'

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
  // checkbox: yup
  //   .string()
  //   .required('checkbox is required')
  radio: yup.string().required('Radio is required'),
  sex: yup.string().oneOf(Object.values(SexEnum)).required('Sex is required'),
})

export const FormPage2 = () => {
  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.formState.formData)

  // checkbox - array number, group CheckboxGroup

  const [advantages, setAdvantages] = useState(formData.advantages)

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
  } = useForm({
    defaultValues: {
      about: formData.about,
      advantages: advantages,
      // checkbox: formData.checkbox,
      radio: formData.radio,
      sex: formData.sex,
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

  useEffect(() => {
    console.log('formData redux', formData)
  }, [formData])

  useEffect(() => {
    console.log('advantages', advantages)
  }, [advantages])

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
          <Label htmlFor="sex">Sex</Label>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <Select {...field} id="sex" value="">
                <option value="" disabled hidden>
                  choose sex...
                </option>
                <option value={SexEnum.Male}>male</option>
                <option value={SexEnum.Female}>female</option>
              </Select>
            )}
          />
          {errors.sex && <ErrorText>{errors.sex.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="radio">Radio</Label>
          <Controller
            name="radio"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup>
                  <input type="radio" {...field} value="one" id="one" />
                  <label htmlFor="one">One</label>
                </RadioGroup>
                <RadioGroup>
                  <input type="radio" {...field} value="two" id="two" />
                  <label htmlFor="two">Two</label>
                </RadioGroup>
                <RadioGroup>
                  <input type="radio" {...field} value="three" id="three" />
                  <label htmlFor="three">Three</label>
                </RadioGroup>
              </>
            )}
          />
          {errors.radio && <ErrorText>{errors.radio.message}</ErrorText>}
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
