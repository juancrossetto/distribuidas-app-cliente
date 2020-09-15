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
} from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../../styles/global";
// import {Picker} from '@react-native-community/picker';
import shortid from "shortid";
import { useNavigation } from "@react-navigation/native";
import { getCurrentDate } from "../../../../utils";
import useAlert from "../../../../hooks/useAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AnimatedButton from "../../../../components/AnimatedButton";
import { INVESTMENTS, addItemToList } from "../../../../utils/storage";

const NewTimeDepositPage = () => {
  const [amount, setAmount] = useState(0);
  const [days, setDays] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (amount <= 0 || days <= 0 || bankAccount.trim() === "") {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    const investment = {
      type: "Plazo Fijo",
      amount,
      date: getCurrentDate(),
      days,
      interestRate: 18,
      bankAccount,
    };
    investment.id = shortid.generate();
    setLoading(true);
    await addItemToList(INVESTMENTS, investment);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("InvestmentsPage");
    }, 1500);
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
          <NativeView style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              Tasa de Interes Anual: 18 %
            </Text>
          </NativeView>
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
