import styled from 'styled-components/native'
import KeyboardView from '../../components/KeyboardView'

export const Container = styled(KeyboardView)`
  flex: 1;
`

export const Header = styled.View`
  height: 80px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: 24px;
`

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})`
  padding: 48px 30px 0;
`
