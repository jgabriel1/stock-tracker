import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '66%',
    alignSelf: 'center',
    marginBottom: 16,

    flexDirection: 'row',
    alignItems: 'center',

    height: 50,
    borderRadius: 25,
    backgroundColor: '#555',
  },

  buttonIconContainer: {
    alignItems: 'center',
    marginLeft: 16,
  },

  buttonTextContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
})

export default styles
