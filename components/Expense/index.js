import React from "react";
import { Text, View, Image } from "react-native";
import {
  PaymentMethods,
  ExpenseTypes,
  ExpenseCategories,
  BudgetCategories,
} from "../../utils/enums";
import styles from "./styles";

const Expense = ({ item }) => {
  const paymentMethod = PaymentMethods.filter(
    (p) => p.value === item.paymentType
  )[0].text;
  const expenseType = ExpenseTypes.filter(
    (p) => p.value === item.expenseType
  )[0].text;

  return (
    <View
      style={[
        styles.expense,
        {
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: "space-around",
        },
      ]}
    >
      <View style={{ flex: 5 }}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Monto:</Text>
          <Text style={styles.text}>$ {item.amount}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Pago:</Text>
          <Text style={styles.text}>{paymentMethod}</Text>
        </View>
        {item.paymentType === "TRC" && item.fees > 0 && (
          <View style={styles.textContainer}>
            <Text style={styles.label}>Cantidad de Cuotas:</Text>
            <Text style={styles.text}>{item.fees}</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.label}>Tipo de Egreso:</Text>
          <Text style={styles.text}>{expenseType}</Text>
        </View>
        {item.expenseType === "PER" ? (
          <View style={styles.textContainer}>
            <Text style={styles.label}>Categoría:</Text>
            <Text style={styles.text}>
              {
                ExpenseCategories.filter((p) => p.value === item.category)[0]
                  .text
              }
            </Text>
          </View>
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.label}>Detalle:</Text>
            <Text style={styles.text}>{item.detail}</Text>
          </View>
        )}
        {item.area && (
          <View style={styles.textContainer}>
            <Text style={styles.label}>Rubro:</Text>
            <Text style={styles.text}>
              {BudgetCategories.filter((p) => p.value === item.area)[0].text}
            </Text>
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.text}>{item.date}</Text>
        </View>
      </View>
      {item.voucher && (
        <View style={{ flex: 3, marginRight: 0 }}>
          <Image source={{ uri: item.voucher }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

export default Expense;
