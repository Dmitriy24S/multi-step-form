import { Fragment } from 'react'
import { BsDot } from 'react-icons/bs'
import { IoMdCheckmark } from 'react-icons/io'
import styled, { css } from 'styled-components'

interface Props {
  formPage: number
}

const totalSteps = 3

export const FormProgress = ({ formPage }: Props) => {
  const pagesArray = Array.from({ length: totalSteps }, (_, index) => index + 1)
  // console.log('pagesArray', pagesArray)
  // pagesArray (3) [1, 2, 3]

  return (
    <ProgressContainer>
      <StepContainer>
        {pagesArray.map((stepNum: number) => {
          const active = stepNum === formPage
          const completed = stepNum < formPage

          return (
            <Fragment key={stepNum}>
              {stepNum > 1 && (
                <ProgressStep $completed={completed} $active={active} />
              )}
              <Marker $active={active} $completed={completed}>
                {completed ? <IoMdCheckmark /> : <BsDot />}
              </Marker>
            </Fragment>
          )
        })}
      </StepContainer>
    </ProgressContainer>
  )
}

const ProgressContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-bottom: 2.2rem;
  width: 100%;
`

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  z-index: 1;
`

const ProgressStep = styled.div<{ $active?: boolean; $completed?: boolean }>`
  flex: 1 1 auto;
  border-top-width: 2px;
  border-color: #eb8697;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    border-color: #9f385a;
    width: 0%;
    left: 0;
    right: -100%;
    height: 100%;
    transition: all 300ms ease-in-out;
    border-top-width: 2px;
    z-index: 20;
    top: -2px;
  }

  ${(props) =>
    props.$active &&
    css`
      &:after {
        content: '';
        position: absolute;
        border-color: #9f385a;
        width: 100%;
        left: 0;
        height: 100%;
        right: 0;
      }
    `}

  ${(props) =>
    props.$completed &&
    css`
      &:after {
        content: '';
        position: absolute;
        border-color: #9f385a;
        width: 100%;
        left: 0;
        height: 100%;
        right: 0;
      }
    `}
`

const Marker = styled.div<{ $active?: boolean; $completed?: boolean }>`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  fill: white;
  background: #f8a5b3;
  position: relative;
  z-index: 2;

  ${(props) =>
    props.$active &&
    css`
      background: #bf4f74;
      color: white;
      outline: 2px solid #e7d1d8;
      outline-offset: -2px;
    `}

  ${(props) =>
    props.$completed &&
    css`
      background: #bf4f74;
      color: white;
    `}
`
