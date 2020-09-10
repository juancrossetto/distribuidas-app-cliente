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
import {View as NativeView, Alert} from 'react-native';
import globalStyles from '../../../styles/global';
import {Picker} from '@react-native-community/picker';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {IncomeCategories} from '../../../utils/enums';

const NewIncomePage = () => {
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
    const income = {amount, category, bankAccount};
    income.id = shortid.generate();
    const existedIncomes = await AsyncStorage.getItem('incomes');
    console.log('ingresos', existedIncomes);
    setLoading(true);

    //llamar API insertar ingreso en BD
    //llamar API actualizar saldo cuenta bancaria (si elegimos esa opcion)
    setTimeout(() => {
      //   AsyncStorage.setItem(
      //     'incomes',
      //     JSON.stringify({...existedIncomes, income}),
      //   );
      AsyncStorage.setItem('incomes', JSON.stringify(income));
      setLoading(false);

      console.log('ingresos 2', existedIncomes);
      navigation.navigate('IncomesPage');
    }, 2000);
  };
  return (
    <Container style={([globalStyles.container], {backgroundColor: '#E84347'})}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.subtitle}>Nuevo Ingreso</H1>
        <Form>
          <NativeView>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                keyboardType="numeric"
                placeholder="$ Monto"
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
              <Picker.Item label="-- Seleccione una categoría --" value="" />
              {IncomeCategories.map((item, i) => (
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

export default NewIncomePage;
