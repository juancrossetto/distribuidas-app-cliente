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
import {
  getFutureDate,
  getEmailUserLogged,
  getCurrentDateISO8601,
} from "../../../../utils";
import useAlert from "../../../../hooks/useAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AnimatedButton from "../../../../components/AnimatedButton";
import {
  createInvestmentInMemory,
  createInvestmentService,
} from "../../../../services/investmentService";
import { getBankAccountsService } from "../../../../services/bankAccountService";
import { genericSelectAsync } from "../../../../db";
import { BANKACCOUNTS } from "../../../../utils/storage";

const NewTimeDepositPage = () => {
  const [amount, setAmount] = useState(0);
  const [days, setDays] = useState(0);
  const [automaticRenovation, setAutomaticRenovation] = useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    // getBankAccounts();
    genericSelectAsync(setBankAccounts, BANKACCOUNTS);
    return () => {};
  }, [isFocused]);

  const getBankAccounts = async () => {
    setBankAccounts(await getBankAccountsService());
  };

  const createTimeDeposit = async (timeDeposit, bankAccountBalance) => {
    setLoading(true);
    // const resp = await createInvestmentService(timeDeposit);
    const resp = await createInvestmentInMemory(
      timeDeposit,
      bankAccountBalance
    );
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
    const bank = bankAccounts.filter((b) => b.id === parseInt(bankAccount))[0];
    if (
      amount <= 0 ||
      days <= 0 ||
      interestRate <= 0 ||
      bankAccount.trim() === ""
    ) {
      setMsg("Todos los campos son obligatorios");
      return;
    }

    if (amount > bank.balance) {
      setMsg(
        "No puede invertir un monto mayor al que posee la cuenta seleccionada"
      );
      return;
    }
    const email = await getEmailUserLogged();
    const date = getCurrentDateISO8601(); //new Date();
    const bankAccountDescription = bank.alias.toString();
    const timeDeposit = {
      type: "Plazo Fijo",
      amount,
      date,
      days,
      interestRate,
      bankAccount,
      bankAccountDescription,
      dueDate: getFutureDate(days),
      email,
      automaticRenovation,
      deposited: false,
      specie: "",
      specieQuantity: 0,
    };
    // investment.id = shortid.generate();
    createTimeDeposit(timeDeposit, bank.balance);
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
                  checked={automaticRenovation}
                  color="#3700B3"
                  onPress={() => setAutomaticRenovation(!automaticRenovation)}
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
          disabled={loading}
          text="Finalizar Inversión"
          onPress={() => handleSubmit()}
        />

        <CustomAlert />
      </View>
    </Container>
  );
};

export default NewTimeDepositPage;
