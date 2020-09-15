import React from "react";
import { Text, View } from "react-native";
import styles from "../Expense/styles";

const BankAccount = ({ item }) => {
  return (
    <View style={[styles.expense, { marginBottom: 5 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>CBU/CVU:</Text>
        <Text style={styles.text}>$ {item.cbu}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Entidad Bancaria:</Text>
        <Text style={styles.text}>{item.entity}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Últimos 4 digitos Tarjeta débito:</Text>
        <Text style={styles.text}>{item.debitCard}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Alias:</Text>
        <Text style={styles.text}>{item.alias}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Saldo:</Text>
        <Text style={styles.text}>$ {item.balance}</Text>
      </View>
    </View>
  );
};

export default BankAccount;
