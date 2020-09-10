import React, {useState} from 'react';
import {
  Text,
  Container,
  Button,
  H1,
  Form,
  Item,
  Input,
  View,
  Spinner,
} from 'native-base';
import {TextInput, View as NativeView, Alert} from 'react-native';
import globalStyles from '../../../styles/global';
import {Picker} from '@react-native-community/picker';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {InvestmentsTypes} from '../../../utils/enums';

const NewInvestmentPage = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const navigation = useNavigation();
  const showAlert = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios', [
      {
        text: 'OK',
      },
    ]);
  };

  const handleSubmit = async () => {
    if (amount <= 0 || category.trim() === '' || bankAccount.trim() === '') {
      showAlert();
      return;
    }
    const investment = {amount, category, bankAccount};
    investment.id = shortid.generate();
    const existedInvestments = await AsyncStorage.getItem('investments');
    console.log('ingresos', existedInvestments);
    setLoading(true);

    setTimeout(() => {
      //   AsyncStorage.setItem(
      //     'investments',
      //     JSON.stringify({...existedInvestments, investment}),
      //   );
      AsyncStorage.setItem('investments', JSON.stringify(investment));
      setLoading(false);
      navigation.navigate('InvestmentsPage');
    }, 2000);
  };
  return (
    <Container style={([globalStyles.container], {backgroundColor: '#E84347'})}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.subtitle}>¿En que vamos a invertir hoy?</H1>
        <Form>
          <NativeView>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                keyboardType="numeric"
                placeholder="$ Monto a Invertir"
                onChangeText={(val) => setAmount(val)}
              />
            </Item>
          </NativeView>
          <NativeView>
            <Picker
              style={{
                height: 50,
                backgroundColor: '#FFF',
              }}
              selectedValue={category}
              onValueChange={(val) => setCategory(val)}>
              <Picker.Item label="-- Invertí en --" value="" />
              {InvestmentsTypes.map((item, i) => (
                <Picker.Item label={item.text} value={item.value} />
              ))}
            </Picker>
          </NativeView>
          <NativeView>
            <Picker
              style={{
                height: 50,
                marginTop: 22,
                backgroundColor: '#FFF',
              }}
              selectedValue={bankAccount}
              onValueChange={(val) => setBankAccount(val)}>
              <Picker.Item
                label="-- Seleccione una Cuenta Bancaria --"
                value=""
              />
              <Picker.Item label="1234567891" value="1" />
              <Picker.Item label="3456789011" value="2" />
              <Picker.Item label="2414205416" value="3" />
            </Picker>
          </NativeView>
        </Form>
        <Button
          style={[globalStyles.button, {marginTop: 30}]}
          square
          block
          onPress={() => handleSubmit()}>
          <Text style={globalStyles.buttonText}>Crear Ingreso</Text>
        </Button>
        {loading && (
          <NativeView>
            <Spinner color="white" />
          </NativeView>
        )}
        {mensaje && showAlert()}
      </View>
    </Container>
  );
};

export default NewInvestmentPage;
