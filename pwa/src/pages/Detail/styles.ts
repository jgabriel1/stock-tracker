import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

interface ColoredTextProps {
  isPositive: boolean
}

export const Container = styled(SafeAreaView)`
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
  font-size: 32px;
  font-weight: bold;
`

export const Content = styled.View`
  flex: 1;
  padding: 0 30px 0;
`

export const FullName = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
`

export const InfosContainer = styled.View`
  margin-bottom: 24px;
  border-bottom-width: 1px;
  border-bottom-color: #b0b0b0;
`

export const InfoItem = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const InfoLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

export const InfoValue = styled.Text`
  font-size: 18px;
`

export const ColoredText = styled.Text<ColoredTextProps>`
  color: ${props => (props.isPositive ? '#0a0' : '#f00')};
`

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  titleContainer: {
    width: '80%',
    marginBottom: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  buttonsContainer: {
    flexDirection: 'row',
    width: '80%',
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: '#999',
  },
})

export default styles
