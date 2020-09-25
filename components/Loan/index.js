import React from "react";
import { Text, View } from "react-native";
import { formatDate } from "../../utils";
import { PaymentMethods } from "../../utils/enums";
import styles from "../Expense/styles";

const Loan = ({ item }) => {
  const paymentMethodSelected = PaymentMethods.filter(
    (b) => b.value === item.paymentMethod
  )[0];
  return (
    <View style={[styles.expense, { marginBottom: 5 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.text}>$ {item.amount}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Método de Pago:</Text>
        <Text style={styles.text}>{paymentMethodSelected.text}</Text>
      </View>
      {item.paymentMethod === "BAN" && (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Cuenta Bancaria:</Text>
          <Text style={styles.text}>{item.bankAccountDescription}</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha de Prestamo:</Text>
        <Text style={styles.text}>{formatDate(item.date)}</Text>
      </View>
    </View>
  );
};

export default Loan;
