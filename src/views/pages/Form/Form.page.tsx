import { useAppSelector } from '../../../redux/app'
import { FormLayout } from '../../layout/Form/Form.layout'

export const FormPage: React.FC = () => {
  const formPage = useAppSelector((state) => state.formState.formPage)

  return <FormLayout formPage={formPage} />
}
