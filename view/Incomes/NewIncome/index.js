import React, { useState, useEffect } from "react";
import { Container, H1, Form, Item, Input, View, Spinner } from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../styles/global";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { IncomeCategories } from "../../../utils/enums";
import useAlert from "../../../hooks/useAlert";
import AnimatedButton from "../../../components/AnimatedButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getEmailUserLogged } from "../../../utils";
import { createIncomeService } from "../../../services/incomeService";
import { getBankAccountsService } from "../../../services/bankAccountService";

const NewIncomePage = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
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

  const createIncome = async (income) => {
    setLoading(true);
    const resp = await createIncomeService(income);
    console.log(resp);
    if (resp.isSuccess) {
      setMsg(resp.data);
      navigation.navigate("IncomesPage");
    } else {
      if (resp.data) {
        setMsg(resp.data);
      }
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (amount <= 0 || category.trim() === "") {
      setMsg("Todos los campos son obligatorios");
      return;
    }

    if (paymentMethod === "BAN" && bankAccount.trim() === "") {
      setMsg(
        "Por favor seleccione una cuenta bancaria donde realizar el depósito"
      );
      return;
    }

    const date = new Date();
    const email = await getEmailUserLogged();
    let bankAccountDescription = "";
    if (paymentMethod === "BAN") {
      const bank = bankAccounts.filter((b) => b.id === bankAccount)[0];
      bankAccountDescription = bank.alias.toString();
    }
    const income = {
      amount,
      category,
      paymentMethod,
      bankAccount,
      bankAccountDescription,
      date,
      email,
    };
    createIncome(income);
  };
  return (
    <Container style={[globalStyles.container]}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.subtitle}>Nuevo Ingreso</H1>
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
              selectedValue={category}
              onValueChange={(val) => setCategory(val)}
            >
              <Picker.Item label="-- Seleccione una categoría --" value="" />
              {IncomeCategories.map((item, i) => (
                <Picker.Item label={item.text} value={item.value} key={i} />
              ))}
            </Picker>
          </NativeView>
          <NativeView>
            <Picker
              style={{
                height: 50,
                marginTop: 22,
                backgroundColor: "#FFF",
              }}
              selectedValue={paymentMethod}
              onValueChange={(val) => setPaymentMethod(val)}
            >
              <Picker.Item
                label="-- Seleccione el Método de Cobro --"
                value=""
              />
              <Picker.Item label={"Efectivo"} value={"EFE"} />
              <Picker.Item label={"Deposito en cuenta"} value={"BAN"} />
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
        </Form>
        <AnimatedButton
          disabled={loading}
          text="Guardar Ingreso"
          onPress={() => handleSubmit()}
        />
        {loading && (
          <NativeView>
            <Spinner color="#000" />
          </NativeView>
        )}
      </View>
      <CustomAlert />
    </Container>
  );
};

export default NewIncomePage;
