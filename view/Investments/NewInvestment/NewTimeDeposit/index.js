import React, { useState } from "react";
import {
  Text,
  Container,
  H1,
  Form,
  Item,
  Input,
  View,
  Spinner,
  ListItem,
  CheckBox,
  Body,
} from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../../styles/global";
// import {Picker} from '@react-native-community/picker';
// import shortid from "shortid";
import { useNavigation } from "@react-navigation/native";
import { getFutureDate, getEmailUserLogged } from "../../../../utils";
import useAlert from "../../../../hooks/useAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AnimatedButton from "../../../../components/AnimatedButton";
import { INVESTMENTS, addItemToList } from "../../../../utils/storage";
import clientAxios from "../../../../config/axios";

const NewTimeDepositPage = () => {
  const [amount, setAmount] = useState(0);
  const [days, setDays] = useState(0);
  const [autmomaticRenovation, setAutmomaticRenovation] = useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const navigation = useNavigation();

  const createTimeDeposit = async (timeDeposit) => {
    try {
      setLoading(true);
      console.log(timeDeposit);
      const resp = await clientAxios.post(`/investments/`, timeDeposit);

      if (resp) {
        setLoading(false);
        setMsg(`Plazo Fijo cargado correctamente`);

        //llamar API actualizar saldo cuenta bancaria (si elegimos esa opcion)

        navigation.navigate("InvestmentsPage");
      }
    } catch (error) {
      if (error.response.data.msg) {
        setMsg(error.response.data.msg);
      } else if (error.response.data.errores) {
        setMsg(error.response.data.errores[0].msg);
      } else {
        await addItemToList(INVESTMENTS, timeDeposit);
        setMsg("Plazo Fijo guardado en Memoria");
        navigation.navigate("InvestmentsPage");
      }
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (
      amount <= 0 ||
      days <= 0 ||
      interestRate <= 0 ||
      bankAccount.trim() === ""
    ) {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    const email = await getEmailUserLogged();
    const date = new Date();
    const timeDeposit = {
      type: "Plazo Fijo",
      amount,
      date,
      days,
      interestRate,
      bankAccount,
      dueDate: getFutureDate(days),
      email,
      autmomaticRenovation,
    };
    // investment.id = shortid.generate();
    createTimeDeposit(timeDeposit);
    setLoading(false);
    // await addItemToList(INVESTMENTS, timeDeposit);

    // setTimeout(() => {
    //   setLoading(false);
    //   navigation.navigate("InvestmentsPage");
    // }, 1500);
  };
  return (
    <Container
      style={([globalStyles.container], { backgroundColor: "#E84347" })}
    >
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>Plazos fijos</H1>
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
              <Picker.Item label="1234567891" value="2414205416" />
              <Picker.Item label="3456789011" value="3456789011" />
              <Picker.Item label="2414205416" value="2414205416" />
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
          <NativeView style={{ marginTop: 0 }}>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                keyboardType="numeric"
                placeholder="Tasa de Interes Anual"
                onChangeText={(val) => setInterestRate(val)}
              />
            </Item>
          </NativeView>
          <NativeView>
            <ListItem>
              <CheckBox
                checked={autmomaticRenovation}
                color="black"
                onPress={() => setAutmomaticRenovation(!autmomaticRenovation)}
              />
              <Body>
                <Text>Renovación Automática</Text>
              </Body>
            </ListItem>
          </NativeView>
          {/* <NativeView style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              Tasa de Interes Anual: 18 %
            </Text>
          </NativeView> */}
        </Form>
        <AnimatedButton
          text="Finalizar Inversión"
          onPress={() => handleSubmit()}
        />
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

export default NewTimeDepositPage;
