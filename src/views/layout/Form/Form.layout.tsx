import styled from 'styled-components'

import {
  FormIntro,
  FormPage1,
  FormPage2,
  FormEnd,
} from '../../../components/Form'
import { FormProgress } from '../../../components/Form/FormProgress'

interface Props {
  formPage: number
}

export const FormLayout = ({ formPage }: Props) => {
  const conditionalComponent = () => {
    switch (formPage) {
      case 1:
        return <FormIntro />
      case 2:
        return <FormPage1 />
      case 3:
        return <FormPage2 />
      case 4:
        return <FormEnd />
      default:
        return <FormIntro />
    }
  }
  return (
    <Container>
      <FormProgress formPage={formPage} />
      {conditionalComponent()}
    </Container>
  )
}

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  background-color: #110f1e;
  padding: 2rem;
  border-radius: 5px;
`
