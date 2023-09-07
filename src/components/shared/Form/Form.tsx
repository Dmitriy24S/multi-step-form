import InputMask from 'react-input-mask'
import styled from 'styled-components'

import { MOBILE_VIEWPORT } from '../../../common/const'

const Header = styled.header`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-bottom: 3rem;
  @media (min-width: ${MOBILE_VIEWPORT}) {
    flex-direction: row;
    text-align: start;
    justify-content: start;
  }
`
const List = styled.ul`
  display: flex;
  font-size: 1rem;
`

const ListItem = styled.li`
  margin-right: 0.9rem;
`

const Link = styled.a`
  text-decoration: none;
  color: #958ec7;
  transition: color 120ms ease;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  &:hover {
    color: #aea7e3;
  }
`
const Label = styled.label`
  margin-bottom: 0.2rem;
`

const Input = styled.input`
  border-radius: 5px;
  width: 100%;
  background-color: #181529;
  border: none;
`

const ErrorText = styled.p`
  font-size: 1rem;
  color: #fa4242;
`

const Textarea = styled.textarea`
  border-radius: 5px;
  width: 100%;
  background-color: #181529;
  border: none;
  min-height: 100px;
`

const Select = styled.select`
  border-radius: 5px;
  width: 100%;
  background-color: #181529;
  border: none;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-bottom: 1rem;
  width: 100%;
`

const MaskedInput = styled(InputMask)`
  border-radius: 5px;
  width: 100%;
  background-color: #181529;
  border: none;
`

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
`

export {
  Header,
  List,
  ListItem,
  Link,
  Label,
  Input,
  ErrorText,
  Form,
  FormGroup,
  MaskedInput,
  Textarea,
  Select,
  RadioGroup,
}
