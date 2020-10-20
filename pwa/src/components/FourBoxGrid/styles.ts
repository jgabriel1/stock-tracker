import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  outterContainer: {
    flex: 1,
    marginVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  innerContainer: {
    width: '50%',
    height: '50%',
    marginBottom: -0.25,
    borderColor: '#ccc',
  },

  topLeft: {
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
  },

  topRight: {
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
  },

  bottomLeft: {
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
  },

  bottomRight: {
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
  },
})

export default styles
