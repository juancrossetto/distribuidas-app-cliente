// import React from "react";
// import { Text, View, StyleSheet } from "react-native";
// import { BankEntities } from "../../utils/enums";
// import styles from "../Expense/styles";

// const CreditCard = ({ item }) => {
//   const entitySelected = BankEntities.filter((b) => b.value === item.entity)[0];

//   const cardStyles = {
//     marginBottom: 5,
//     backgroundColor: entitySelected.color,
//   };
//   return (
//     <View style={[styles.expense, cardStyles]}>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <View style={styles.textContainer}>
//           <Text style={styles.label}>Últimos 4 dígitos:</Text>
//           <Text style={styles.text}>{item.number}</Text>
//         </View>
//         <View style={styles.textContainer}>
//           <Text style={styles.text}>{item.entity}</Text>
//         </View>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.label}>Fecha de Vencimiento:</Text>
//         <Text style={styles.text}>
//           {item.dueMonth}/{item.dueYear}
//         </Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.label}>Fecha de Vencimiento Resúmen:</Text>
//         <Text style={styles.text}>{item.dueDateSummary}</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.label}>Fecha de Cierre Resúmen:</Text>
//         <Text style={styles.text}>{item.closeDateSummary}</Text>
//       </View>
//     </View>
//   );
// };

// export default CreditCard;

import React, { useState } from "react";
// import CreditCard from "react-native-credit-card";
import { BankEntities } from "../../utils/enums";
import styles from "../Expense/styles";
import { View, Text, Button, Alert } from "react-native";
import { CardView } from "react-native-credit-card-input";
import globalStyles from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import useAlert from "../../hooks/useAlert";

const CreditCardCustom = ({ item }) => {
  const navigation = useNavigation();

  const handleDetail = () => {
    Alert.alert(
      `Detalle tarjeta ${item.number} `,
      `Entidad Bancaria: ${item.entity} \nFecha de Vencimiento Resúmen: ${
        item.dueDateSummary
      } \nFecha de Cierre Resúmen: ${
        item.closeDateSummary
      }\nMonto gastado(Mes en Curso): ${"15.000"} `,
      [
        {
          text: "Confirmar",
        },
      ]
    );
  };

  return (
    <View
      style={{
        borderBottomColor: "white",
        borderBottomWidth: 1,
        borderRadius: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
          marginTop: 5,
        }}
      >
        <CardView
          number={item.number}
          expiry={item.expiry}
          name={item.name}
          brand={"visa"}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 5,
        }}
      >
        <Button
          title={"Ver Detalle"}
          onPress={handleDetail}
          color={"#6304c3"}
        />
        <Button
          title={"Actualizar Fechas"}
          onPress={() =>
            navigation.navigate("ChangeDatesCreditCardPage", { card: item })
          }
          color={"#6304c3"}
        />
      </View>
    </View>
  );
};

export default CreditCardCustom;
