import React, { useState, useEffect } from "react";
import {
  Container,
  H1,
  Form,
  Item,
  Input,
  View,
  Spinner,
  Icon,
} from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../styles/global";
// import {Picker} from '@react-native-community/picker';
import shortid from "shortid";
import { useNavigation } from "@react-navigation/native";
import { BankEntities } from "../../../utils/enums";
// import styles from '../../../components/Investment';
import { getCurrentDate } from "../../../utils";
import useAlert from "../../../hooks/useAlert";
import AnimatedButton from "../../../components/AnimatedButton";

const NewBankAccountPage = () => {
  const [cbu, setCBU] = useState(0);
  const [debitCard, setDebitCard] = useState("");
  const [entity, setEntity] = useState("");
  const [alias, setAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (
      cbu <= 0 ||
      entity.trim() === "" ||
      debitCard <= 0 ||
      alias.trim() === ""
    ) {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    const bankAccount = {
      cbu,
      entity,
      debitCard,
      alias,
      date: getCurrentDate(),
    };
    bankAccount.id = shortid.generate();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("BankAccountsPage");
    }, 2000);
  };
  return (
    <Container
      style={([globalStyles.container], { backgroundColor: "#E84347" })}
    >
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>Asocia tu cuenta</H1>
        <Form>
          <NativeView>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
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
                <Picker.Item label={item.text} value={item.value} />
              ))}
            </Picker>
          </NativeView>
          <NativeView style={{ marginTop: 22 }}>
            <Item inlineLabel last style={globalStyles.input}>
              <Icon active name="card-outline" />
              <Input
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
        </Form>
        <AnimatedButton
          text="Finalizar Inversión"
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

export default NewBankAccountPage;
