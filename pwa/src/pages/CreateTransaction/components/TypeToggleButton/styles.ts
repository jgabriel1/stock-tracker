import styled from 'styled-components/native'

interface TypeTextProps {
  isActive: boolean
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
  position: relative;
`

export const TypeBackgroundMovingBlock = styled.View<TypeTextProps>`
  position: absolute;
  height: 100%;
  width: 50%;
  border-radius: 30px;
  background: #3a3a3a;

  left: ${({ isActive }) => (isActive ? 0 : 50)}%;
`

export const TypeTextBackgroundContainer = styled.View`
  width: 50%;
  justify-content: center;
  align-items: center;
`

export const TypeText = styled.Text<TypeTextProps>`
  font-size: 18px;

  color: ${({ isActive }) => (isActive ? '#ededed' : '#3a3a3a')};
`
