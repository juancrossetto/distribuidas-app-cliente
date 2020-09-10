import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const Expense = ({item}) => {
  return (
    <View style={[styles.expense, {marginBottom: 5}]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.text}>$ {item.amount}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Medio de Pago:</Text>
        <Text style={styles.text}>{item.paymentType}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Tipo de Egreso:</Text>
        <Text style={styles.text}>{item.expenseType}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.text}>{item.date}</Text>
      </View>
    </View>
  );
};

export default Expense;
