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
                <ProgressStep
                  // style={{
                  //   backgroundColor: stepNum <= formPage ? 'red' : 'blue',
                  // }}
                  // $completed={stepNum + 1 < formPage}
                  $completed={completed}
                  $active={active}
                />
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
  /*  */
  width: 100%;
  /* margin: 0 auto; */
  /* max-width: 600px; */
  /* padding: 0 15px; */
`

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 70px; */
  position: relative;
  width: 100%;
  z-index: 1;
  /*  */

  :before {
    /* content: '';
    position: absolute;
    z-index: 0;
    background: #f3e7f3;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    z-index: 1; */
  }

  :after {
    /* content: '';
    position: absolute;
    z-index: 0;
    background: #4a154b;
    height: 4px;
    width: 33%;
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0; */
  }
`

const ProgressStep = styled.div<{ $active?: boolean; $completed?: boolean }>`
  /* &::after {
    content: '';
    position: absolute;
    left: 100%;
    right: 0;
    top: 0;
    width: 100%;
    background-color: green;
    height: 5px;
  } */

  /* &:before {
    content: '';
    position: absolute;
    background: #f3e7f3;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  &:after {
    content: '';
    position: absolute;
    background: #4a154b;
    height: 4px;
    width: 33%;
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  } */
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
      /* border-color: #9f385a; */
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
      /* border-color: #9f385a; */
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
  /* background: #2a1f5d; */
  background: #f8a5b3;
  position: relative;
  /* width: 100%; */
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
