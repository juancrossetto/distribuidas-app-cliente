import React from 'react';
import {Text, View} from 'react-native';
import styles from '../Expense/styles';

const Loan = ({item}) => {
  return (
    <View style={[styles.expense, {marginBottom: 5}]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.text}>$ {item.amount}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha de Prestamo:</Text>
        <Text style={styles.text}>{item.date}</Text>
      </View>
    </View>
  );
};

export default Loan;
