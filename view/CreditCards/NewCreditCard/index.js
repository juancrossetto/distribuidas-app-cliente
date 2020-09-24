import React, { useState, useEffect, useCallback } from "react";
import { Container, H1, Form, Item, Input, View, Spinner } from "native-base";
import { View as NativeView, Picker, Button } from "react-native";
import globalStyles from "../../../styles/global";
import shortid from "shortid";
import { useNavigation } from "@react-navigation/native";
import { BankEntities, Months } from "../../../utils/enums";
import { getCurrentDate, getEmailUserLogged } from "../../../utils";
import useAlert from "../../../hooks/useAlert";
import AnimatedButton from "../../../components/AnimatedButton";
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CREDITCARDS, addItemToList } from "../../../utils/storage";
import { CardView } from "react-native-credit-card-input";
import clientAxios from "../../../config/axios";
import { createCreditCardService } from "../../../services/creditCardService";

const NewCreditCardPage = () => {
  const [number, setNumber] = useState(0);
  // const [expiryMonth, setExpiryMonth] = useState(null);
  // const [expiryYear, setExpiryYear] = useState(null);
  const [entity, setEntity] = useState("");
  // const [cbu, setCBU] = useState("");

  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [closeDateSummary, setCloseDateSummary] = useState(null);
  const [dueDateSummary, setDueDateSummary] = useState(null);

  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [isDueDatePickerVisible, setIsDueDatePickerVisibility] = useState(
    false
  );
  const [isClosedDatePickerVisible, setIsClosedDatePickerVisibility] = useState(
    false
  );

  const confirmDueDate = (date) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    setDueDateSummary(date.toLocaleDateString("es-ES", options));
    setIsDueDatePickerVisibility(false);
  };

  const confirmClosedDate = (date) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    setCloseDateSummary(date.toLocaleDateString("es-ES", options));
    setIsClosedDatePickerVisibility(false);
  };

  const handleSubmit = async () => {
    if (
      number <= 0 ||
      // cbu <= 0 ||
      entity.trim() === "" ||
      name.trim() === "" ||
      expiry.trim() === "" ||
      // expiryMonth === null ||
      // expiryYear === null ||
      closeDateSummary === null ||
      dueDateSummary === null
    ) {
      setMsg("Todos los campos son obligatorios");
      return;
    }

    if (number.length !== 16) {
      setMsg("Tarjeta no válida");
      return;
    }

    if (closeDateSummary > dueDateSummary) {
      setMsg("La fecha de cierre no puede ser mayor a la de vencimiento");
      return;
    }

    const date = new Date();
    const email = await getEmailUserLogged();
    const creditCard = {
      number,
      entity,
      name,
      expiry,
      closeDateSummary,
      dueDateSummary,
      date,
      email,
    };
    // creditCard.id = shortid.generate();
    createCreditCard(creditCard);
    setLoading(false);
  };

  const createCreditCard = async (creditCard) => {
    setLoading(true);
    const resp = await createCreditCardService(creditCard);
    if (resp.isSuccess) {
      setMsg(resp.data);
      navigation.navigate("CreditCardsPage");
    } else {
      if (resp.data) {
        setMsg(resp.data);
      }
    }
    setLoading(false);
  };

  return (
    <Container style={[globalStyles.container]}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>Asocia tu Tarjeta de Crédito</H1>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <CardView
            number={number?.toString()}
            name={name}
            expiry={expiry}
            // onChange={onChange}
          />
        </View>
        <Form>
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
          {/* <NativeView style={{ marginTop: 22, flexDirection: "row" }}>
            <NativeView style={{ flex: 1 }}>
              <Picker
                style={{
                  height: 50,
                  backgroundColor: "#FFF",
                  width: "90%",
                }}
                selectedValue={expiryMonth}
                onValueChange={(val) => setExpiryMonth(val)}
              >
                <Picker.Item label="-- Mes de Vencimiento --" value="" />
                {Months.map((item, i) => (
                  <Picker.Item label={item.text} value={item.value} key={i} />
                ))}
              </Picker>
            </NativeView>
            <NativeView style={{ flex: 1 }}>
              <Picker
                style={{
                  height: 50,
                  backgroundColor: "#FFF",
                }}
                selectedValue={expiryYear}
                onValueChange={(val) => setExpiryYear(val)}
              >
                <Picker.Item label="-- Año Vencimiento --" value="0" />
                <Picker.Item label="2020" value="20" />
                <Picker.Item label="2021" value="21" />
                <Picker.Item label="2022" value="22" />
                <Picker.Item label="2023" value="23" />
                <Picker.Item label="2024" value="24" />
                <Picker.Item label="2025" value="25" />
                <Picker.Item label="2026" value="26" />
                <Picker.Item label="2027" value="27" />
                <Picker.Item label="2028" value="28" />
                <Picker.Item label="2029" value="29" />
                <Picker.Item label="2030" value="30" />
              </Picker>
            </NativeView>
          </NativeView> */}
          <NativeView style={{ marginTop: 22 }}>
            <Item inlineLabel last style={globalStyles.input}>
              <AntDesign name="creditcard" size={20} color="blue" />
              <Input
                maxLength={16}
                keyboardType="numeric"
                placeholder="Número de Tarjeta de Crédito"
                onChangeText={(val) => setNumber(val)}
              />
            </Item>
          </NativeView>
          <NativeView style={{ marginTop: 0 }}>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                placeholder="Mes y Año de Expiración (MM/YY)"
                maxLength={4}
                keyboardType="numeric"
                onChangeText={(val) => setExpiry(val)}
              />
            </Item>
          </NativeView>
          <NativeView style={{ marginTop: 0 }}>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                placeholder="Nombre"
                onChangeText={(val) => setName(val)}
              />
            </Item>
          </NativeView>
          <NativeView>
            <Button
              title={
                !closeDateSummary
                  ? "Seleccionar Fecha de Cierre"
                  : closeDateSummary
              }
              onPress={() => setIsClosedDatePickerVisibility(true)}
              color={!closeDateSummary ? "#2b6fa6" : "#4BB543"}
            />
            <DateTimePickerModal
              isVisible={isClosedDatePickerVisible}
              mode="date"
              onConfirm={confirmClosedDate}
              onCancel={() => setIsClosedDatePickerVisibility(false)}
              locale="es_ES"
              headerTextIOS="Elige la fecha de Cierre"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
            />
          </NativeView>
          <NativeView style={{ marginTop: 20 }}>
            <Button
              title={
                !dueDateSummary
                  ? "Selecconar Fecha de Vencimiento"
                  : dueDateSummary
              }
              onPress={() => setIsDueDatePickerVisibility(true)}
              color={!dueDateSummary ? "#2b6fa6" : "#4BB543"}
            />
            <DateTimePickerModal
              isVisible={isDueDatePickerVisible}
              mode="date"
              onConfirm={confirmDueDate}
              onCancel={() => setIsDueDatePickerVisibility(false)}
              locale="es_ES"
              headerTextIOS="Elige la fecha de Vencimiento"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
            />
          </NativeView>
        </Form>
        <AnimatedButton
          text="Registrar Tarjeta"
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

export default NewCreditCardPage;
