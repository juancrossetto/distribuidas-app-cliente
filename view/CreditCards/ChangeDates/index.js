import React, { useState } from "react";
import { View as NativeView, Button, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Container, H1, Form, Item, Input, View, Spinner } from "native-base";
import globalStyles from "../../../styles/global";
import useAlert from "../../../hooks/useAlert";
import { useNavigation } from "@react-navigation/native";
import AnimatedButton from "../../../components/AnimatedButton";
import { CardView } from "react-native-credit-card-input";
import { CREDITCARDS, saveItem } from "../../../utils/storage";
import clientAxios from "../../../config/axios";

const ChangeDatesCreditCardPage = ({ route }) => {
  const card = route.params.card;

  const navigation = useNavigation();
  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(false);

  const [closeDateSummary, setCloseDateSummary] = useState(null);
  const [dueDateSummary, setDueDateSummary] = useState(null);
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

  const handleSubmit = () => {
    if (closeDateSummary === null || dueDateSummary === null) {
      setMsg("Todos los campos son obligatorios");
      return;
    }

    if (closeDateSummary > dueDateSummary) {
      setMsg("La fecha de cierre no puede ser mayor a la de vencimiento");
      return;
    }
    const creditCard = card;
    creditCard.closeDateSummary = closeDateSummary;
    creditCard.dueDateSummary = dueDateSummary;
    updateDates(creditCard);
  };

  const updateDates = async (creditCard) => {
    // LLamar API  UpdateDatesCreditCard;
    try {
      const resp = await clientAxios.put(`/creditcards/`, creditCard);
      if (resp) {
        setLoading(false);
        setMsg(`Fechas del Resúmen editadas correctamente`);
        navigation.navigate("CreditCardsPage");
      } else {
        await saveItem(CREDITCARDS, creditCard);
        console.log("nuevooo", creditCard);
        setCardsList(await getItem(CREDITCARDS));
        navigation.navigate("CreditCardsPage");
      }
    } catch (error) {
      console.log("error", error);
      if (error.response.data.errores) {
        setMsg(error.response.data.errores[0].msg);
      }

      await saveItem(CREDITCARDS, creditCard);
      console.log("nuevooo", creditCard);
      setMsg("Tarjeta de Crédito guardada en Memoria");
      navigation.navigate("CreditCardsPage");
      setLoading(false);
    }
  };
  return (
    <Container
      style={([globalStyles.container], { backgroundColor: "#E84347" })}
    >
      <View style={globalStyles.content}>
        <H1 style={globalStyles.subtitle}>
          Actualiza las fechas de tu tarjeta
        </H1>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          <CardView
            number={card.number}
            expiry={card.expiry}
            name={card.name}
            brand={"visa"}
          />
        </View>
        <Form>
          <NativeView>
            <Text style={globalStyles.buttonText}>Fecha de Cierre:</Text>
            <Button
              title={
                !closeDateSummary
                  ? "Seleccionar Fecha de Cierre"
                  : closeDateSummary
              }
              onPress={() => setIsClosedDatePickerVisibility(true)}
              color={!closeDateSummary ? "#212316" : "#4BB543"}
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
            <Text style={globalStyles.buttonText}>Fecha de Vencimiento:</Text>
            <Button
              title={
                !dueDateSummary
                  ? "Selecconar Fecha de Vencimiento"
                  : dueDateSummary
              }
              onPress={() => setIsDueDatePickerVisibility(true)}
              color={!dueDateSummary ? "#212316" : "#4BB543"}
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
        <AnimatedButton text="Ajustar Fechas" onPress={() => handleSubmit()} />
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

export default ChangeDatesCreditCardPage;
