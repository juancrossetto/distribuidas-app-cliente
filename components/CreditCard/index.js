import React from "react";
import { Text, View } from "react-native";
import styles from "../Expense/styles";

const CreditCard = ({ item }) => {
  return (
    <View style={[styles.expense, { marginBottom: 5 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Últimos 4 dígitos:</Text>
        <Text style={styles.text}>$ {item.number}</Text>
      </View>
    </View>
  );
};

export default CreditCard;
