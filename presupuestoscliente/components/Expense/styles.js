import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  expense: {
    backgroundColor: '#e1e1e1',
    borderBottomColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    // marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    // justifyContent: 'center',
  },
});
export default styles;
