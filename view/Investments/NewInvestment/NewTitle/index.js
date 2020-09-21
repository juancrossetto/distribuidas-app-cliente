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
// import shortid from "shortid";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Titles } from "../../../../utils/enums";
import useAlert from "../../../../hooks/useAlert";
import AnimatedButton from "../../../../components/AnimatedButton";
import { getBankAccountsService } from "../../../../services/bankAccountService";
import { createInvestmentService } from "../../../../services/investmentService";
import { getEmailUserLogged } from "../../../../utils";

const NewTitlePage = () => {
  const [specie, setSpecie] = useState("");
  // const [unitValue, setUnitValue] = useState(0);
  const [rate, setRate] = useState(0);
  const [specieQuantity, setSpecieQuantity] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    getBankAccounts();
    if (specie) {
      const rateTitle = Titles.filter((t) => t.value === specie)[0].rate;
      setRate(rateTitle);
    }
    return () => {};
  }, [specie, isFocused]);

  const getBankAccounts = async () => {
    setBankAccounts(await getBankAccountsService());
  };

  const createTitle = async (title) => {
    setLoading(true);
    const resp = await createInvestmentService(title);
    if (resp.isSuccess) {
      setMsg(resp.msg);
      navigation.navigate("InvestmentsPage");
    } else {
      if (resp.msg) {
        setMsg(resp.msg);
      }
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (
      specie.trim() === "" ||
      rate <= 0 ||
      specieQuantity <= 0 ||
      bankAccount.trim() === ""
    ) {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    const date = new Date();
    const email = await getEmailUserLogged();
    const investment = {
      type: "Títulos Valores",
      specie,
      rate,
      // rate,
      date,
      specieQuantity,
      bankAccount,
      email,
    };
    // investment.id = shortid.generate();
    createTitle(investment);
    setLoading(false);
  };

  return (
    <Container
      style={([globalStyles.container], { backgroundColor: "#E84347" })}
    >
      {loading ? (
        <NativeView
          style={{
            marginTop: 50,
          }}
        >
          <Spinner color="white" />
        </NativeView>
      ) : (
        <View style={globalStyles.content}>
          <H1 style={globalStyles.title}>Títulos Valores</H1>
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
                <Picker.Item label="-- Seleccione un Título --" value="" />
                {Titles.map((item, i) => (
                  <Picker.Item label={item.text} value={item.value} key={i} />
                ))}
              </Picker>
            </NativeView>
            {specie ? (
              <NativeView style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  Tasa del Título: $ {rate}
                </Text>
              </NativeView>
            ) : null}

            {/* <NativeView>
            <Item inlineLabel last style={globalStyles.input}>
              <MaterialCommunityIcons name="cash-usd" size={24} color="green" />
              <Input
                keyboardType="numeric"
                placeholder="Monto a Invertir"
                onChangeText={(val) => setAmount(val)}
              />
            </Item>
          </NativeView> */}
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
                  placeholder="Cantidad de Títulos comprados"
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

export default NewTitlePage;
