import React, { useState, useEffect } from "react";
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
  Icon,
} from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../../styles/global";
// import {Picker} from '@react-native-community/picker';
import shortid from "shortid";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getCurrentDate } from "../../../../utils";
import useAlert from "../../../../hooks/useAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NewLoanPage = () => {
  const [amount, setAmount] = useState(0);
  //   const [type, setType] = useState('');
  const [days, setDays] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (
      amount <= 0 ||
      days <= 0 ||
      //   type.trim() === '' ||
      bankAccount.trim() === ""
    ) {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    const investment = {
      amount,
      //   type,
      date: getCurrentDate(),
      days,
      bankAccount,
    };
    investment.id = shortid.generate();
    const existedInvestments = await AsyncStorage.getItem("investments");
    setLoading(true);

    setTimeout(() => {
      AsyncStorage.setItem("investments", JSON.stringify(investment));
      setLoading(false);
      navigation.navigate("LoansPage");
    }, 2000);
  };
  return (
    <Container
      style={([globalStyles.container], { backgroundColor: "#E84347" })}
    >
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>Prestamo</H1>
        <Form>
          <NativeView>
            <Item inlineLabel last style={globalStyles.input}>
              <MaterialCommunityIcons name="cash-usd" size={24} color="green" />
              <Input
                keyboardType="numeric"
                placeholder="Monto a Invertir"
                onChangeText={(val) => setAmount(val)}
              />
            </Item>
          </NativeView>
          {/* <NativeView>
            <Picker
              style={{
                height: 50,
                backgroundColor: '#FFF',
              }}
              selectedValue={type}
              onValueChange={(val) => setType(val)}>
              <Picker.Item label="-- Invertí en --" value="" />
              {InvestmentsTypes.map((item) => (
                <Picker.Item label={item.text} value={item.value} />
              ))}
            </Picker>
          </NativeView> */}
          {/* {type !== '' && ( 
          <NativeView style={{marginTop: 10}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              Tasa de Interes Anual: 18 %
            </Text>
          </NativeView>
         )} */}
          <NativeView>
            <Picker
              style={{
                height: 50,
                backgroundColor: "#FFF",
              }}
              selectedValue={bankAccount}
              onValueChange={(val) => setBankAccount(val)}
            >
              <Picker.Item
                label="-- Seleccione una Cuenta Bancaria --"
                value=""
              />
              <Picker.Item label="1234567891" value="1" />
              <Picker.Item label="3456789011" value="2" />
              <Picker.Item label="2414205416" value="3" />
            </Picker>
          </NativeView>
          <NativeView style={{ marginTop: 22 }}>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                keyboardType="numeric"
                placeholder="Plazo de inversión (en dias habiles)"
                onChangeText={(val) => setDays(val)}
              />
            </Item>
          </NativeView>
        </Form>
        <Button
          style={[globalStyles.button, { marginTop: 30 }]}
          square
          block
          onPress={() => handleSubmit()}
        >
          <Text style={globalStyles.buttonText}>Guardar Prestamo</Text>
        </Button>
        {loading && (
          <NativeView>
            <Spinner color="white" />
          </NativeView>
        )}
        <CustomAlert />
      </View>
    </Container>
  );
};

export default NewLoanPage;
