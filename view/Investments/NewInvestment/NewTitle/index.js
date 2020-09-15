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
import { useNavigation } from "@react-navigation/native";
import { Titles } from "../../../../utils/enums";
import { getCurrentDate } from "../../../../utils";
import useAlert from "../../../../hooks/useAlert";
import AnimatedButton from "../../../../components/AnimatedButton";
import { INVESTMENTS, addItemToList } from "../../../../utils/storage";

const NewTitlePage = () => {
  const [title, setTitle] = useState("");
  // const [unitValue, setUnitValue] = useState(0);
  const [rate, setRate] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (
      title.trim() === "" ||
      rate <= 0 ||
      quantity <= 0 ||
      bankAccount.trim() === ""
    ) {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    const investment = {
      type: "Títulos Valores",
      title,
      rate,
      // rate,
      date: getCurrentDate(),
      quantity,
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

  useEffect(() => {
    if (title) {
      const rateTitle = Titles.filter((t) => t.value === title)[0].rate;
      setRate(rateTitle);
    }

    return () => {};
  }, [title]);
  return (
    <Container
      style={([globalStyles.container], { backgroundColor: "#E84347" })}
    >
      {loading ? (
        <NativeView>
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
                selectedValue={title}
                onValueChange={(val) => setTitle(val)}
              >
                <Picker.Item label="-- Seleccione un Título --" value="" />
                {Titles.map((item, i) => (
                  <Picker.Item label={item.text} value={item.value} key={i} />
                ))}
              </Picker>
            </NativeView>
            {title ? (
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
                  placeholder="Cantidad de Títulos comprados"
                  onChangeText={(val) => setQuantity(val)}
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
