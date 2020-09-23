import React from "react";
import { View, Button, Alert } from "react-native";
import { CardView } from "react-native-credit-card-input";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../../utils";
import { getPaymentTotalAmountService } from "../../services/expenseService";

const CreditCardCustom = ({ item }) => {
  const navigation = useNavigation();

  const handleDetail = async () => {
    const resp = await getPaymentTotalAmountService("TRC", item.number);

    let totalAmount = 0;
    // if (resp.isSuccess && resp.data.totalAmount > 0);
    // {
    //   console.log("resp", resp.data);
    //   totalAmount = resp.data.totalAmount;
    // }
    Alert.alert(
      `Detalle tarjeta ${item.number} `,
      `Entidad Bancaria: ${item.entity}\nFecha de Cierre Resúmen: ${formatDate(
        item.closeDateSummary
      )}\nFecha de Vencimiento Resúmen: ${formatDate(
        item.dueDateSummary
      )} \nMonto gastado(Mes en Curso): ${totalAmount} `,
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
