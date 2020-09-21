import React from "react";
import { Text, View } from "react-native";
import { formatDate } from "../../utils";
import { IncomeCategories } from "../../utils/enums";
import styles from "../Expense/styles";

const Income = ({ item }) => {
  return (
    <View style={[styles.expense, { marginBottom: 5 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.text}>$ {item.amount}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.text}>
          {IncomeCategories.filter((p) => p.value === item.category)[0].text}
        </Text>
      </View>
      {item.paymentMethod === "BAN" ? (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Medio de Pago:</Text>
            <Text style={styles.text}>Deposito en cuenta</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Cuenta Bancaria:</Text>
            <Text style={styles.text}>{item.bankAccount}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Medio de Pago:</Text>
          <Text style={styles.text}>Efectivo</Text>
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.text}>{formatDate(item.date)}</Text>
      </View>
    </View>
  );
};

export default Income;
