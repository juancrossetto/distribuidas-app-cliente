import React, { useState, useEffect } from "react";
import { Container, H1, Form, Item, Input, View, Spinner } from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../styles/global";
// import {Picker} from '@react-native-community/picker';
// import shortid from "shortid";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getCurrentDateISO8601, getEmailUserLogged } from "../../../utils";
import useAlert from "../../../hooks/useAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AnimatedButton from "../../../components/AnimatedButton";
import { LoanTypes } from "../../../utils/enums";
import { getBankAccountsService } from "../../../services/bankAccountService";
import {
  createLoanInMemory,
  createLoanService,
} from "../../../services/loanService";
import { genericSelectAsync } from "../../../db";
import { BANKACCOUNTS } from "../../../utils/storage";

const NewLoanPage = ({ route }) => {
  const type = route.params.type;
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  // const [days, setDays] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [fees, setFees] = useState(0);
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

  const createLoan = async (loan, bankAccountBalance) => {
    setLoading(true);
    // const resp = await createLoanService(loan);
    const resp = await createLoanInMemory(loan, bankAccountBalance);
    if (resp.isSuccess) {
      setMsg(resp.data);
      navigation.navigate("LoansPage");
    } else {
      if (resp.data) {
        setMsg(resp.data);
      }
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (amount <= 0 || paymentMethod.trim() === "") {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    if (paymentMethod === "BAN" && bankAccount.trim() === "") {
      setMsg("Seleccione la cuenta de banco");
      return;
    }

    if (paymentMethod === "BAN" && type === "TOM" && fees <= 0) {
      setMsg("Seleccione la cantidad de cuotas");
      return;
    }

    const email = await getEmailUserLogged();
    let bankAccountDescription = "";
    let bankAccountBalance = 0;
    if (paymentMethod === "BAN") {
      const bank = bankAccounts.filter(
        (b) => b.id === parseInt(bankAccount)
      )[0];
      bankAccountDescription = bank.alias.toString();
      bankAccountBalance = bank.balance;
    }
    const loan = {
      amount,
      type,
      paymentMethod,
      bankAccount,
      bankAccountDescription,
      fees,
      date: getCurrentDateISO8601(), //new Date(),
      email,
    };
    // loan.id = shortid.generate();
    createLoan(loan, bankAccountBalance);
  };
  return (
    <Container style={[globalStyles.container]}>
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
          )}
          {paymentMethod === "BAN" && type === "TOM" && (
            <NativeView>
              <Picker
                style={{
                  height: 40,
                  marginTop: 22,
                  backgroundColor: "#FFF",
                }}
                selectedValue={fees}
                onValueChange={(val) => setFees(val)}
              >
                <Picker.Item
                  label="-- Seleccione cantidad de Cuotas --"
                  value="0"
                />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="24" value="24" />
              </Picker>
            </NativeView>
          )}
        </Form>
        <AnimatedButton
          disabled={loading}
          text="Guardar Prestamo"
          onPress={() => handleSubmit()}
        />
        {loading && (
          <NativeView>
            <Spinner color="#000" />
          </NativeView>
        )}
        <CustomAlert />
      </View>
    </Container>
  );
};

export default NewLoanPage;
