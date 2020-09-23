import React from "react";
import { Text, View } from "react-native";
import { formatDate } from "../../utils";
import { Titles, Actions } from "../../utils/enums";
import styles from "../Expense/styles";

const Investment = ({ item }) => {
  return (
    <View style={[styles.expense, { marginBottom: 5 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Tipo de Inversión:</Text>
        <Text style={styles.text}>{item.type}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Cuenta Bancaria:</Text>
        <Text style={styles.text}>{item.bankAccount}</Text>
      </View>
      {item.type === "Plazo Fijo" ? (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Monto Invertido:</Text>
            <Text style={styles.text}>
              $ {item.amount} a {item.days} días
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Tasa de Interes Anual:</Text>
            <Text style={styles.text}>{item.interestRate} %</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Ganancia:</Text>
            <Text
              style={[
                styles.text,
                { color: "#33cc33", fontSize: 18, fontWeight: "bold" },
              ]}
            >
              $
              {(
                item.amount *
                ((item.interestRate / 100) * (item.days / 365))
              ).toFixed(3)}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Vencimiento:</Text>
            <Text style={styles.text}>
              {formatDate(item.dueDate)}
              {item.autmomaticRenovation && " Con Renovación Automatica"}
            </Text>
          </View>
        </>
      ) : null}
      {item.type === "Títulos Valores" ? (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Título a Invertir:</Text>
            <Text style={styles.text}>
              {Titles?.filter((t) => t.value === item.specie)[0].text}
              {/* {item.specie} */}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Cantidad de Títulos Comprados:</Text>
            <Text style={styles.text}>{item.specieQuantity}</Text>
          </View>
        </>
      ) : null}
      {item.type === "Acción" ? (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Acción a Invertir:</Text>
            <Text style={styles.text}>
              {Actions.filter((t) => t.value === item.specie)[0].text}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Cantidad de Acciones Compradas:</Text>
            <Text style={styles.text}>{item.specieQuantity}</Text>
          </View>
        </>
      ) : null}
      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha de Inversión:</Text>
        <Text style={styles.text}>{formatDate(item.date)}</Text>
      </View>
    </View>
  );
};

export default Investment;
