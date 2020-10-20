import styled, { css } from 'styled-components/native'

interface TypeTextProps {
  isActive: boolean
}

interface TypeTextContainerProps {
  isActive: boolean
  side: 'left' | 'right'
}

export const Container = styled.TouchableWithoutFeedback``

export const Content = styled.View`
  height: 60px;
  width: 100%;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: row;
  margin-bottom: 32px;
  border-radius: 60px;
  border: 1px solid #a2a2a2;
`

export const TypeTextBackgroundContainer = styled.View<TypeTextContainerProps>`
  width: 50%;
  justify-content: center;
  align-items: center;

  background-color: ${({ isActive }) => (isActive ? '#3a3a3a' : '#ededed')};

  ${({ side }) =>
    side === 'left'
      ? css`
          border-top-left-radius: 30px;
          border-bottom-left-radius: 30px;
        `
      : css`
          border-top-right-radius: 30px;
          border-bottom-right-radius: 30px;
        `}
`

export const TypeText = styled.Text<TypeTextProps>`
  font-size: 18px;

  color: ${({ isActive }) => (isActive ? '#ededed' : '#3a3a3a')};
`
