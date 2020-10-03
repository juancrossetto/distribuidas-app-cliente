import React, { useState, useEffect } from "react";
import { View, Button, Alert } from "react-native";
import { CardView } from "react-native-credit-card-input";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { formatMillisecondsToDateString } from "../../utils";
import { getPaymentTotalAmountService } from "../../services/expenseService";
import { genericSelectAsync, getTotalAmountCreditCardAsync } from "../../db";
import { CREDITCARDMOVEMENTS, CREDITCARDS } from "../../utils/storage";

const CreditCardCustom = ({ item }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getTotalAmountCreditCardAsync(setCard, item.email, item.number);
    }
    return () => {};
  }, [isFocused]);

  const navigation = useNavigation();
  const [card, setCard] = useState([]);

  const handleDetail = async () => {
    Alert.alert(
      `Detalle tarjeta ${item.number}`,
      `Entidad Bancaria: ${
        item.entity
      }\nFecha de Cierre Resúmen: ${formatMillisecondsToDateString(
        item.closeDateSummary
      )}\nFecha de Vencimiento Resúmen: ${formatMillisecondsToDateString(
        item.dueDateSummary
      )} \nMonto gastado(Mes en Curso): ${
        card && card.length > 0 ? card[0].totalAmount : 0
      } `,
      [
        {
          text: "Confirmar",
        },
      ]
    );
  };

  return (
    <View
      style={{
        borderBottomColor: "white",
        borderBottomWidth: 1,
        borderRadius: 5,
      }}
    >
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
          number={item.number?.toString()}
          expiry={item.expiry}
          name={item.name}
          brand={"visa"}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 5,
        }}
      >
        <Button
          title={"Ver Detalle"}
          onPress={() => handleDetail()}
          color={"#6304c3"}
        />
        <Button
          title={"Actualizar Fechas"}
          onPress={() =>
            navigation.navigate("ChangeDatesCreditCardPage", {
              card: item,
              fromLogin: false,
            })
          }
          color={"#6304c3"}
        />
      </View>
    </View>
  );
};

export default CreditCardCustom;
