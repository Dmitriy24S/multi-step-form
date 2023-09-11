import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../redux/app'
import { setPage } from '../../redux/features/form/formSlice'
import { Button } from '../shared/Button'

export const FormEnd = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h2 className="text-3xl my-4 font-semibold">
        Form Successfully Submitted
      </h2>
      <Button
        type="button"
        onClick={() => {
          dispatch(setPage(1))
          navigate('/form')
        }}
      >
        Go to home
      </Button>
    </div>
  )
}
