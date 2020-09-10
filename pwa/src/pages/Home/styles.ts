import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  titleContainer: {
    width: '80%',
    paddingBottom: 96,
  },

  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 32,
  },

  titleDescription: {
    fontSize: 14,
  },

  buttonContainer: {
    width: '80%',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999',
    height: 48,
    borderRadius: 4,
    marginBottom: 16,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
})

export default styles
