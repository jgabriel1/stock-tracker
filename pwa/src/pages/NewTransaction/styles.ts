import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    alignItems: 'flex-start',
  },

  closeButton: {
    marginRight: 24,
    marginTop: 24,
  },

  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },

  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 16,
    width: '80%',
    fontSize: 16,
    marginBottom: 16,
  },
})

export default styles
