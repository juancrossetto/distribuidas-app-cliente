import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { BankEntities } from "../../utils/enums";
import styles from "../Expense/styles";

const CreditCard = ({ item }) => {
  const entitySelected = BankEntities.filter((b) => b.text === item.entity)[0];
  const cardStyles = {
    marginBottom: 5,
    backgroundColor: entitySelected.color,
  };
  return (
    <View style={[styles.expense, cardStyles]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.label}>Últimos 4 dígitos:</Text>
          <Text style={styles.text}>{item.number}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.entity}</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha de Vencimiento:</Text>
        <Text style={styles.text}>
          {item.dueMonth}/{item.dueYear}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha de Vencimiento Resúmen:</Text>
        <Text style={styles.text}>{item.dueDateSummary}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha de Cierre Resúmen:</Text>
        <Text style={styles.text}>{item.closeDateSummary}</Text>
      </View>
    </View>
  );
};

export default CreditCard;
