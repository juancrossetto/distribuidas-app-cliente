import React from "react";
import { Text, View } from "react-native";
import {
  PaymentMethods,
  ExpenseTypes,
  ExpenseCategories,
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
    <View style={[styles.expense, { marginBottom: 5 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.text}>$ {item.amount}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Medio de Pago:</Text>
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
      {item.expenseType === "PER" && (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Categoría:</Text>
          <Text style={styles.text}>
            {ExpenseCategories.filter((p) => p.value === item.category)[0].text}
          </Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.text}>{item.date}</Text>
      </View>
    </View>
  );
};

export default Expense;
