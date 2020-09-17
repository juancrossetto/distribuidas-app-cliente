import React from "react";
import { View, Text } from "react-native";
import { Container, H1 } from "native-base";
import globalStyles from "../../../styles/global";
import AmountSpentChart from "../../../components/Charts/AmountSpentChart";
import { PaymentMethods } from "../../../utils/enums";
const AmountSpentPage = () => {
  let expenses = [];

  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
      0,
      7
    );
  for (let i = 0; i < 6; i++) {
    expenses.push({
      paymentMethod: PaymentMethods[i].text,
      amount: Math.floor(Math.random() * 5000 + 100),
      color: randomColor(),
    });
  }

  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={[{ marginTop: 30, flex: 1 }]}>
        <H1 style={globalStyles.title}>Gastos de este mes</H1>
      </View>
      <View style={[globalStyles.content, { flex: 10 }]}>
        <AmountSpentChart
          data={expenses}
          style={{
            flex: 10,
            borderColor: "red",
            borderWidth: 2,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "#fff1",
          marginTop: 10,
          padding: 15,
          borderRadius: 5,
        }}
      >
        {expenses.map((exp, i) => (
          <Text
            key={i}
            style={{
              color: "#fff",
            }}
          >
            <View
              style={{
                width: 15,
                height: 10,
                backgroundColor: exp.color,
              }}
            ></View>
            {exp.paymentMethod}: ${exp.amount}
          </Text>
        ))}
      </View>
    </Container>
  );
};

export default AmountSpentPage;
