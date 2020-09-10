import React from 'react';
import {Text, View} from 'react-native';
import styles from '../Expense/styles';

const Investment = ({item}) => {
  return (
    <View style={[styles.expense, {marginBottom: 5}]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Tipo de Inversión:</Text>
        <Text style={styles.text}>$ {item.type}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Cuenta Bancaria:</Text>
        <Text style={styles.text}>{item.bankAccount}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Monto Invertido:</Text>
        <Text style={styles.text}>
          {item.amount} a {item.days} días
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha de Inversión:</Text>
        <Text style={styles.text}>{item.date}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Tasa de Interes Anual:</Text>
        <Text style={styles.text}>{item.interestRate} %</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Ganancia:</Text>
        <Text style={[styles.text, {color: 'green'}]}>
          $
          {(
            item.amount *
            ((item.interestRate / 100) * (item.days / 365))
          ).toFixed(3)}
        </Text>
      </View>
    </View>
  );
};

export default Investment;
