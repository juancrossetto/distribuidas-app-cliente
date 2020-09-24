import React, { useState, useEffect } from "react";
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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getFutureDate, getEmailUserLogged } from "../../../../utils";
import useAlert from "../../../../hooks/useAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AnimatedButton from "../../../../components/AnimatedButton";
import { createInvestmentService } from "../../../../services/investmentService";
import { getBankAccountsService } from "../../../../services/bankAccountService";

const NewTimeDepositPage = () => {
  const [amount, setAmount] = useState(0);
  const [days, setDays] = useState(0);
  const [autmomaticRenovation, setAutmomaticRenovation] = useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    getBankAccounts();
    return () => {};
  }, [isFocused]);

  const getBankAccounts = async () => {
    setBankAccounts(await getBankAccountsService());
  };

  const createTimeDeposit = async (timeDeposit) => {
    setLoading(true);
    const resp = await createInvestmentService(timeDeposit);
    if (resp.isSuccess) {
      setMsg(resp.data);
      navigation.navigate("InvestmentsPage");
    } else {
      if (resp.data) {
        setMsg(resp.data);
      }
    }
    setLoading(false);
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
  };
  return (
    <Container style={[globalStyles.container]}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>Plazos fijos</H1>
        {!loading ? (
          <Form>
            <NativeView>
              <Item inlineLabel last style={globalStyles.input}>
                <MaterialCommunityIcons
                  name="cash-usd"
                  size={24}
                  color="green"
                />
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
                  label={
                    bankAccounts?.length > 0
                      ? "-- Seleccione una Cuenta Bancaria --"
                      : "-- No posee cuentas Bancarias Registradas --"
                  }
                  value=""
                />
                {bankAccounts?.map((item, i) => (
                  <Picker.Item
                    label={`${item?.alias.toString()}  (${item?.cbu.toString()})`}
                    value={item?.id.toString()}
                    key={i}
                  />
                ))}
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
                  color="#3700B3"
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
        ) : (
          <NativeView>
            <Spinner color="#000" />
          </NativeView>
        )}
        <AnimatedButton
          text="Finalizar Inversión"
          onPress={() => handleSubmit()}
        />

        <CustomAlert />
      </View>
    </Container>
  );
};

export default NewTimeDepositPage;
