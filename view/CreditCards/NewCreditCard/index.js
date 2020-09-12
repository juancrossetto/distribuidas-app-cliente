import React, { useState, useEffect, useCallback } from "react";
import { Container, H1, Form, Item, Input, View, Spinner } from "native-base";
import { View as NativeView, Picker, Button } from "react-native";
import globalStyles from "../../../styles/global";
import shortid from "shortid";
import { useNavigation } from "@react-navigation/native";
import { BankEntities, Months } from "../../../utils/enums";
import { getCurrentDate } from "../../../utils";
import useAlert from "../../../hooks/useAlert";
import AnimatedButton from "../../../components/AnimatedButton";
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const NewCreditCardPage = () => {
  const [number, setNumber] = useState(0);
  const [dueMonth, setDueMonth] = useState(null);
  const [dueYear, setDueYear] = useState(null);
  const [entity, setEntity] = useState("");
  const [cbu, setCBU] = useState("");
  const [alias, setAlias] = useState("");
  const [closeDate, setCloseDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [isDueDatePickerVisible, setDueDatePickerVisibility] = useState(false);
  const [isClosedDatePickerVisible, setIsClosedDatePickerVisibility] = useState(
    false
  );

  const confirmDueDate = (date) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    setDueDate(date.toLocaleDateString("es-ES", options));
    setDueDatePickerVisibility(false);
  };

  const confirmClosedDate = (date) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    setCloseDate(date.toLocaleDateString("es-ES", options));
    setClosedDatePickerVisibility(false);
  };

  const handleSubmit = async () => {
    if (
      number <= 0 ||
      cbu <= 0 ||
      entity.trim() === "" ||
      alias.trim() === "" ||
      dueDate === null ||
      dueYear === null ||
      closeDate === null ||
      dueDate === null
    ) {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    const creditCard = {
      number,
      cbu,
      entity,
      alias,
      dueDate,
      dueYear,
      closeDate,
      dueDate,
      date: getCurrentDate(),
    };
    creditCard.id = shortid.generate();
    console.log(creditCard);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("CreditCardsPage");
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
              <Input
                keyboardType="numeric"
                placeholder="CBU/CBU"
                onChangeText={(val) => setCBU(val)}
              />
            </Item>
          </NativeView>
          <NativeView
            style={{
              flexDirection: "row",
            }}
          >
            <NativeView style={{ flex: 1 }}>
              <Picker
                style={{
                  height: 50,
                  backgroundColor: "#FFF",
                  width: "90%",
                }}
                selectedValue={dueMonth}
                onValueChange={(val) => setDueMonth(val)}
              >
                <Picker.Item label="-- Mes de Vencimiento --" value="" />
                {Months.map((item, i) => (
                  <Picker.Item label={item.text} value={item.value} />
                ))}
              </Picker>
            </NativeView>
            <NativeView style={{ flex: 1 }}>
              <Picker
                style={{
                  height: 50,
                  backgroundColor: "#FFF",
                }}
                selectedValue={dueYear}
                onValueChange={(val) => setDueYear(val)}
              >
                <Picker.Item label="-- Año Vencimiento --" value="0" />
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
                <Picker.Item label="2025" value="2025" />
                <Picker.Item label="2026" value="2026" />
                <Picker.Item label="2027" value="2027" />
                <Picker.Item label="2028" value="2028" />
                <Picker.Item label="2029" value="2029" />
                <Picker.Item label="2030" value="2030" />
              </Picker>
            </NativeView>
          </NativeView>

          <NativeView style={{ marginTop: 22 }}>
            <Item inlineLabel last style={globalStyles.input}>
              <AntDesign name="creditcard" size={20} color="blue" />
              <Input
                keyboardType="numeric"
                placeholder="Últimos 4 digitos Tarjeta de Crédito"
                onChangeText={(val) => setNumber(val)}
              />
            </Item>
          </NativeView>
          <NativeView>
            <Button
              title={!closeDate ? "Seleccionar Fecha de Cierre" : closeDate}
              onPress={() => setIsClosedDatePickerVisibility(true)}
              color="#E1E1E1"
            />
            <DateTimePickerModal
              isVisible={isClosedDatePickerVisible}
              mode="date"
              onConfirm={confirmClosedDate}
              onCancel={() => setClosedDatePickerVisibility(false)}
              locale="es_ES"
              headerTextIOS="Elige la fecha de Cierre"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
            />
          </NativeView>
          <NativeView style={{ marginTop: 20 }}>
            <Button
              title={!dueDate ? "Selecconar Fecha de Vencimiento" : dueDate}
              onPress={() => setDueDatePickerVisibility(true)}
              color="#E1E1E1"
            />
            <DateTimePickerModal
              isVisible={isDueDatePickerVisible}
              mode="date"
              onConfirm={confirmDueDate}
              onCancel={() => setDueDatePickerVisibility(false)}
              locale="es_ES"
              headerTextIOS="Elige la fecha de Vencimiento"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
            />
          </NativeView>
          <NativeView style={{ marginTop: 20 }}>
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
    // </ApplicationProvider>
  );
};

export default NewCreditCardPage;
