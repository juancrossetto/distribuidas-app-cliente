import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Container, H1, Spinner } from "native-base";
import globalStyles from "../../../styles/global";
import AmountSpentChart from "../../../components/Charts/AmountSpentChart";
import { PaymentMethods } from "../../../utils/enums";
import { getMonthlyExpensesService } from "../../../services/expenseService";
import { useIsFocused } from "@react-navigation/native";
import { getRandomColor } from "../../../utils";
const AmountSpentPage = () => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  // let expenses = [];
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    getMonthlyExpenses();
    return () => {};
  }, [isFocused]);

  const getMonthlyExpenses = async () => {
    setLoading(true);
    const expensesResult = await getMonthlyExpensesService();
    setExpenses(expensesResult);

    setLoading(false);
  };

  // for (let i = 0; i < 6; i++) {
  //   expenses.push({
  //     paymentMethod: PaymentMethods[i].text,
  //     amount: Math.floor(Math.random() * 5000 + 2000),
  //     color: randomColor(),
  //   });
  // }

  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      {loading ? (
        <View>
          <Spinner color="white" />
        </View>
      ) : (
        <>
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
            {expenses?.map((exp, i) => (
              <Text
                key={i}
                style={{
                  color: "#FFF",
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 10,
                    backgroundColor: exp.color,
                  }}
                ></View>
                {exp &&
                  PaymentMethods?.filter((p) => p.value === exp._id)[0].text}
                : ${exp.TotalAmount}
              </Text>
            ))}
          </View>
        </>
      )}
    </Container>
  );
};

export default AmountSpentPage;
