import React, { useState, useEffect } from "react";
import { Container, H1, Form, Item, Input, View, Spinner } from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../styles/global";
// import {Picker} from '@react-native-community/picker';
// import shortid from "shortid";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getEmailUserLogged } from "../../../utils";
import useAlert from "../../../hooks/useAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AnimatedButton from "../../../components/AnimatedButton";
import { LoanTypes } from "../../../utils/enums";
import { getBankAccountsService } from "../../../services/bankAccountService";
import { createLoanService } from "../../../services/loanService";

const NewLoanPage = ({ route }) => {
  const type = route.params.type;
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  // const [days, setDays] = useState("");
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

  const createLoan = async (loan) => {
    setLoading(true);
    const resp = await createLoanService(loan);
    if (resp.isSuccess) {
      setMsg(resp.msg);
      navigation.navigate("LoansPage");
    } else {
      if (resp.msg) {
        setMsg(resp.msg);
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

    const email = await getEmailUserLogged();
    const loan = {
      amount,
      type,
      paymentMethod,
      bankAccount,
      date: new Date(),
      email,
    };
    // loan.id = shortid.generate();
    createLoan(loan);
    setLoading(false);
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
                  label={
                    bankAccounts.length > 0
                      ? "-- Seleccione una Cuenta Bancaria --"
                      : "-- No posee cuentas Bancarias Registradas --"
                  }
                  value=""
                />
                {bankAccounts?.map((item, i) => (
                  <Picker.Item
                    label={`${item?.alias.toString()}  (${item?.cbu.toString()})`}
                    value={item?.cbu.toString()}
                    key={i}
                  />
                ))}
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
