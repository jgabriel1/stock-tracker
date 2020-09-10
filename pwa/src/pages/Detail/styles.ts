import { StyleSheet } from 'react-native'

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
