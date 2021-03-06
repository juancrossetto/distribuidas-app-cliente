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
} from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../../styles/global";
import shortid from "shortid";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Actions } from "../../../../utils/enums";
import { getCurrentDateISO8601, getEmailUserLogged } from "../../../../utils";
import useAlert from "../../../../hooks/useAlert";
import AnimatedButton from "../../../../components/AnimatedButton";
import { getBankAccountsService } from "../../../../services/bankAccountService";
import {
  createInvestmentInMemory,
  createInvestmentService,
} from "../../../../services/investmentService";
import { genericSelectAsync } from "../../../../db";
import { BANKACCOUNTS } from "../../../../utils/storage";

const NewActionPage = () => {
  const [specie, setSpecie] = useState("");
  const [unitValue, setUnitValue] = useState(0);
  // const [rate, setRate] = useState(0);
  const [specieQuantity, setSpecieQuantity] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    // getBankAccounts();

    genericSelectAsync(setBankAccounts, BANKACCOUNTS);
    if (specie) {
      const actionSelected = Actions.filter((t) => t.value === specie)[0]
        .actionValue;
      setUnitValue(actionSelected);
    }
    return () => {};
  }, [specie, isFocused]);

  const getBankAccounts = async () => {
    setBankAccounts(await getBankAccountsService());
  };

  const createAction = async (action, bankAccountBalance) => {
    setLoading(true);
    // const resp = await createInvestmentService(action);
    const resp = await createInvestmentInMemory(action, bankAccountBalance);
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
      specie.trim() === "" ||
      unitValue <= 0 ||
      specieQuantity <= 0 ||
      bankAccount.trim() === ""
    ) {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    const email = await getEmailUserLogged();
    const date = getCurrentDateISO8601(); //new Date();
    const bank = bankAccounts.filter((b) => b.id === parseInt(bankAccount))[0];
    const bankAccountDescription = bank.alias.toString();
    const investment = {
      amount: 0,
      type: "Acción",
      specie,
      unitValue,
      days: 0,
      deposited: false,
      interestRate: 0,
      // rate,
      specieQuantity,
      bankAccount,
      bankAccountDescription,
      date,
      dueDate: date,
      email,
    };
    // investment.id = shortid.generate();
    createAction(investment, bank.balance);
    setLoading(true);
  };

  return (
    <Container style={[globalStyles.container]}>
      {loading ? (
        <NativeView>
          <Spinner color="#000" />
        </NativeView>
      ) : (
        <View style={globalStyles.content}>
          <H1 style={globalStyles.title}>Acciones</H1>
          <Form>
            <NativeView>
              <Picker
                style={{
                  height: 50,
                  marginTop: 22,
                  backgroundColor: "#FFF",
                }}
                selectedValue={specie}
                onValueChange={(val) => setSpecie(val)}
              >
                <Picker.Item label="-- Seleccione una Acción --" value="" />
                {Actions.map((item, i) => (
                  <Picker.Item label={item.text} value={item.value} key={i} />
                ))}
              </Picker>
            </NativeView>
            {specie ? (
              <NativeView style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  Valor Unitario de la Acción: $ {unitValue}
                </Text>
              </NativeView>
            ) : null}
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

            <NativeView style={{ marginTop: 22 }}>
              <Item inlineLabel last style={globalStyles.input}>
                <Input
                  keyboardType="numeric"
                  placeholder="Cantidad de Acciones compradas"
                  onChangeText={(val) => setSpecieQuantity(val)}
                />
              </Item>
            </NativeView>
          </Form>
          <AnimatedButton
            text="Finalizar Inversión"
            onPress={() => handleSubmit()}
          />
          <CustomAlert />
        </View>
      )}
    </Container>
  );
};

export default NewActionPage;
