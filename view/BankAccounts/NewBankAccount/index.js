import React, { useState } from "react";
import { Container, H1, Form, Item, Input, View, Spinner } from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../styles/global";
// import shortid from "shortid";
import { useNavigation } from "@react-navigation/native";
import { BankEntities } from "../../../utils/enums";
import { getEmailUserLogged } from "../../../utils";
import useAlert from "../../../hooks/useAlert";
import AnimatedButton from "../../../components/AnimatedButton";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBankAccountService } from "../../../services/bankAccountService";

const NewBankAccountPage = () => {
  const [cbu, setCBU] = useState(0);
  const [debitCard, setDebitCard] = useState("");
  const [entity, setEntity] = useState("");
  const [alias, setAlias] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const navigation = useNavigation();

  const createBankAccount = async (bankAccount) => {
    setLoading(true);
    const resp = await createBankAccountService(bankAccount);
    if (resp.isSuccess) {
      setMsg(resp.data);
      navigation.navigate("BankAccountsPage");
    } else {
      if (resp.data) {
        setMsg(resp.data);
      }
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (
      cbu <= 0 ||
      entity.trim() === "" ||
      debitCard <= 0 ||
      balance <= 0 ||
      alias.trim() === ""
    ) {
      setMsg("Todos los campos son obligatorios");
      return;
    }

    if (cbu.length !== 22) {
      setMsg("El CBU/CVU debe tener 22 dígitos");
      return;
    }

    if (debitCard.length !== 16) {
      setMsg("La tarjeta debe tener 16 dígitos");
      return;
    }
    // const debitCardNumber = getRandomCardNumber(16);
    const email = await getEmailUserLogged();
    const bankAccount = {
      cbu,
      entity,
      debitCard,
      alias,
      balance,
      date: new Date(), //getCurrentDate(),
      email,
    };
    // bankAccount.id = shortid.generate();
    createBankAccount(bankAccount);
    setLoading(false);
  };
  return (
    <Container style={[globalStyles.container]}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>Asocia tu cuenta</H1>
        <Form>
          <NativeView>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                maxLength={22}
                keyboardType="numeric"
                placeholder="CBU/CBU"
                onChangeText={(val) => setCBU(val)}
              />
            </Item>
          </NativeView>
          <NativeView>
            <Picker
              style={{
                height: 50,
                backgroundColor: "#FFF",
              }}
              selectedValue={entity}
              onValueChange={(val) => setEntity(val)}
            >
              <Picker.Item
                label="-- Seleccione una Entidad Bancaria --"
                value=""
              />
              {BankEntities.map((item, i) => (
                <Picker.Item label={item.text} value={item.value} key={i} />
              ))}
            </Picker>
          </NativeView>
          <NativeView style={{ marginTop: 22 }}>
            <Item inlineLabel last style={globalStyles.input}>
              <AntDesign name="creditcard" size={20} color="blue" />
              <Input
                maxLength={16}
                keyboardType="numeric"
                placeholder="Tarjeta de Débito"
                onChangeText={(val) => setDebitCard(val)}
              />
            </Item>
          </NativeView>
          <NativeView>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                placeholder="Alias"
                onChangeText={(val) => setAlias(val)}
              />
            </Item>
          </NativeView>
          <NativeView>
            <Item inlineLabel last style={globalStyles.input}>
              <MaterialCommunityIcons name="cash-usd" size={24} color="green" />
              <Input
                keyboardType="numeric"
                placeholder="Saldo"
                onChangeText={(val) => setBalance(val)}
              />
            </Item>
          </NativeView>
        </Form>
        <AnimatedButton text="Guardar Cuenta" onPress={() => handleSubmit()} />
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

export default NewBankAccountPage;
