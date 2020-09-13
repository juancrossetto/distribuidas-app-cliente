import React, { useState } from "react";
import { Container, H1, Form, Item, Input, View, Spinner } from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../styles/global";
import shortid from "shortid";
import { useNavigation } from "@react-navigation/native";
import { IncomeCategories } from "../../../utils/enums";
import useAlert from "../../../hooks/useAlert";
import AnimatedButton from "../../../components/AnimatedButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NewIncomePage = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [CustomAlert, setMsg] = useAlert();
  const handleSubmit = async () => {
    if (amount <= 0 || category.trim() === "" || bankAccount.trim() === "") {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    const income = { amount, category, bankAccount };
    income.id = shortid.generate();
    setLoading(true);

    //llamar API insertar ingreso en BD
    //llamar API actualizar saldo cuenta bancaria (si elegimos esa opcion)
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("IncomesPage");
    }, 2000);
  };
  return (
    <Container
      style={([globalStyles.container], { backgroundColor: "#E84347" })}
    >
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
                <Picker.Item label={item.text} value={item.value} />
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
        </Form>
        <AnimatedButton text="Guardar Ingreso" onPress={() => handleSubmit()} />
        {loading && (
          <NativeView>
            <Spinner color="white" />
          </NativeView>
        )}
      </View>
      <CustomAlert />
    </Container>
  );
};

export default NewIncomePage;
