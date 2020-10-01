import React, { useState } from "react";
import { View as NativeView, Button, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Container, H1, Form, Item, Input, View, Spinner } from "native-base";
import globalStyles from "../../../styles/global";
import useAlert from "../../../hooks/useAlert";
import { useNavigation } from "@react-navigation/native";
import AnimatedButton from "../../../components/AnimatedButton";
import { CardView } from "react-native-credit-card-input";
// import { CREDITCARDS, saveItem, removeItem } from "../../../utils/storage";
// import clientAxios from "../../../config/axios";
import { updateCreditCardService } from "../../../services/creditCardService";
import { updateCreditCardDatesAsync } from "../../../db";
import { formatDateStringToMilliseconds } from "../../../utils";

const ChangeDatesCreditCardPage = ({ route }) => {
  const { card, fromLogin } = route.params;
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
    setLoading(true);
    // const resp = await updateCreditCardService(creditCard);
    const resp = await updateCreditCardDatesAsync(
      creditCard.id,
      formatDateStringToMilliseconds(creditCard.dueDateSummary),
      formatDateStringToMilliseconds(creditCard.closeDateSummary)
    );
    if (resp.isSuccess) {
      setMsg(resp.data);
      if (fromLogin) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("CreditCardsPage");
      }
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
            number={card.number?.toString()}
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
            <Text style={globalStyles.buttonText}>Fecha de Vencimiento:</Text>
            <Button
              title={
                !dueDateSummary
                  ? "Seleccionar Fecha de Vencimiento"
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
        <AnimatedButton text="Ajustar Fechas" onPress={() => handleSubmit()} />
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

export default ChangeDatesCreditCardPage;
