import React from "react";
import { Text, View } from "react-native";
import { formatDate, formatMillisecondsToDateString } from "../../utils";
import { BudgetCategories } from "../../utils/enums";
import styles from "../Expense/styles";

const Budget = ({ item }) => {
  const category = BudgetCategories.filter((p) => p.value === item.category)[0]
    .text;
  return (
    <View style={[styles.expense, { marginBottom: 5 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.text}>$ {item.amount}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Rubro:</Text>
        <Text style={styles.text}>{category}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.text}>{item.type}</Text>
      </View>
      {/* <View style={styles.textContainer}>
        <Text style={styles.label}>Meses:</Text>
        <Text style={styles.text}>{item.months}</Text>
      </View> */}
      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.text}>
          {formatMillisecondsToDateString(item.date)}
        </Text>
      </View>
    </View>
  );
};

export default Budget;
