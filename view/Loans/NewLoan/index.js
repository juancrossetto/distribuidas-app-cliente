import React, { useState, useEffect } from "react";
import { Container, H1, Form, Item, Input, View, Spinner } from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../styles/global";
// import {Picker} from '@react-native-community/picker';
import shortid from "shortid";
import { useNavigation } from "@react-navigation/native";
import { getCurrentDate } from "../../../utils";
import useAlert from "../../../hooks/useAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AnimatedButton from "../../../components/AnimatedButton";
import { LoanTypes } from "../../../utils/enums";
import { LOANS, addItemToList } from "../../../utils/storage";

const NewLoanPage = ({ route }) => {
  const type = route.params.type;
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  // const [days, setDays] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (amount <= 0 || paymentMethod.trim() === "") {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    if (paymentMethod === "BAN" && bankAccount.trim() === "") {
      setMsg("Seleccione la cuenta de banco");
      return;
    }

    const loan = {
      amount,
      type,
      paymentMethod,
      bankAccount,
      date: getCurrentDate(),
    };
    loan.id = shortid.generate();
    setLoading(true);
    await addItemToList(LOANS, loan);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("LoansPage");
    }, 2000);
  };
  return (
    <Container
      style={([globalStyles.container], { backgroundColor: "#E84347" })}
    >
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>
          Nuevo Prestamo {type === "TOM" ? "Tomado" : "Realizado"}
        </H1>
        <Form>
          <NativeView>
            <Item inlineLabel last style={globalStyles.input}>
              <MaterialCommunityIcons name="cash-usd" size={24} color="green" />
              <Input
                keyboardType="numeric"
                placeholder="Monto"
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
              selectedValue={paymentMethod}
              onValueChange={(val) => setPaymentMethod(val)}
            >
              <Picker.Item label="-- Seleccione el medio de pago --" value="" />
              <Picker.Item label="Cuenta Bancaria" value="BAN" />
              <Picker.Item label="Efectivo" value="EFE" />
            </Picker>
          </NativeView>

          {paymentMethod === "BAN" && (
            <NativeView>
              <Picker
                style={{
                  height: 50,
                  marginTop: 22,
                  backgroundColor: "#FFF",
                }}
                selectedValue={bankAccount}
                onValueChange={(val) => setBankAccount(val)}
              >
                <Picker.Item
                  label="-- Seleccione una Cuenta Bancaria --"
                  value=""
                />
                <Picker.Item label="1234567891" value="1234567891" />
                <Picker.Item label="3456789011" value="3456789011" />
                <Picker.Item label="2414205416" value="2414205416" />
              </Picker>
            </NativeView>
          )}
        </Form>
        <AnimatedButton
          text="Guardar Prestamo"
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

export default NewLoanPage;
