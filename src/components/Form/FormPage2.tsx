import { useAppDispatch } from '../../redux/app'
import { nextPage, prevPage } from '../../redux/features/form/formSlice'
import { Button, FormNavigationButtonContainer } from '../shared/Button/Button'

export const FormPage2 = () => {
  const dispatch = useAppDispatch()

  return (
    <div>
      FormPage2
      <FormNavigationButtonContainer>
        <Button onClick={() => dispatch(prevPage())}>Back</Button>
        <Button onClick={() => dispatch(nextPage())}>Next</Button>
      </FormNavigationButtonContainer>
    </div>
  )
}
