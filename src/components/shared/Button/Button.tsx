import styled from 'styled-components'

const Button = styled.button`
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 7px;
  background-color: pink;
  color: #181529;
  padding: 0.7rem 2rem;
  margin-top: 1.5rem;
  transition: background-color 120ms ease;
  &:hover {
    background-color: #ffaab8;
  }
`

const FormNavigationButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export { Button, FormNavigationButtonContainer }
