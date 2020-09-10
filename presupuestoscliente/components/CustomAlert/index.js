import React from 'react';
import {Toast} from 'native-base';
import {Alert} from 'react-native';
const CustomAlert = ({message, title, buttonText}) => (
  <>
    {/* {Toast.show({
      title: title,
      text: message,
      buttonText: buttonText,
      duration: 5000,
    })} */}
    {Alert.alert(
      title,
      message,
      [
        {
          text: buttonText, // Arreglo de botones
        },
      ],
      {cancelable: true},
    )}
  </>
);

CustomAlert.defaultProps = {
  message: '',
  title: 'Error',
  buttonText: 'OK',
};

export default CustomAlert;
