import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Container,
  Button,
  Text,
  H1,
  Input,
  Form,
  Item,
  Toast,
} from 'native-base';
import globalStyles from '../../styles/global';
import {useNavigation} from '@react-navigation/native';

const Expenses = () => {
  const [message, setMessage] = useState(null);

  const navigation = useNavigation();

  const handleSubmit = async () => {};

  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 5000,
    });
  };
  return (
    <Container style={[globalStyles.container, {backgroundColor: '#e84347'}]}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>Egresos</H1>
        {message && showAlert()}
      </View>
    </Container>
  );
};

export default Expenses;
