import React, {useState, useEffect} from 'react';
import {Toast} from 'native-base';
import {Alert} from 'react-native';
const useAlert = (initialTitle) => {
  const [msg, setMsg] = useState('');
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    if (msg !== '') {
      setMsg('');
    }
  }, [msg]);
  const CustomAlert = () => (
    <>
      {msg !== '' &&
        // Alert.alert(
        //   title,
        //   msg,
        //   [
        //     {
        //       text: 'OK',
        //     },
        //   ],
        //   {cancelable: true},
        // )
        Toast.show({
          title: title,
          text: msg,
          buttonText: 'OK',
          duration: 2000,
        })}
    </>
  );
  return [CustomAlert, setMsg, setTitle];
};

useAlert.defaultProps = {
  message: '',
  initialTitle: 'Error',
  buttonText: 'OK',
};

export default useAlert;
