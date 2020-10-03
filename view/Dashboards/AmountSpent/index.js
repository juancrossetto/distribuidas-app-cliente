import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Container, H1, Spinner } from "native-base";
import globalStyles from "../../../styles/global";
import AmountSpentChart from "../../../components/Charts/AmountSpentChart";
import { PaymentMethods } from "../../../utils/enums";
import { getMonthlyExpensesService } from "../../../services/expenseService";
import { useIsFocused } from "@react-navigation/native";
import { getEmailUserLogged, getRandomColor } from "../../../utils";
import { getAmountSpentAsync } from "../../../db";

const AmountSpentPage = () => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  let colors = [];
  const [expenses, setExpenses] = useState([]);

  const getColorByType = (type) => {
    const payment = PaymentMethods.filter((p) => p.value === type);
    if (payment && payment.length > 0) {
      return payment[0].color;
    } else {
      return "#000000";
    }
  };

  useEffect(() => {
    if (isFocused) {
      getMonthlyExpenses();
    }
    return () => {};
  }, [isFocused]);

  const getMonthlyExpenses = async () => {
    setLoading(true);
    const email = await getEmailUserLogged();
    // const expensesResult = await getMonthlyExpensesService();
    await getAmountSpentAsync(setExpenses, email);
    // setExpenses(expensesResult);

    setLoading(false);
  };

  return (
    <Container style={[globalStyles.container]}>
      {loading ? (
        <View>
          <Spinner color="#000" />
        </View>
      ) : (
        <>
          <View style={[{ marginTop: 30, flex: 1 }]}>
            <H1 style={globalStyles.title}>Gastos de este mes</H1>
          </View>
          {expenses && expenses.length > 0 ? (
            <>
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
                      color: "#3700B3",
                      fontWeight: "bold",
                    }}
                  >
                    <View
                      style={{
                        width: 15,
                        height: 10,
                        marginRight: 10,
                        backgroundColor: getColorByType(exp.paymentType),
                      }}
                    />
                    {exp &&
                      PaymentMethods?.filter(
                        (p) => p.value === exp.paymentType
                      )[0].text}
                    : ${exp.totalAmount}
                  </Text>
                ))}
              </View>
            </>
          ) : (
            <View style={[{ marginTop: 30, flex: 1 }]}>
              <H1 style={globalStyles.subtitle}>
                Usted no posee egresos este mes
              </H1>
            </View>
          )}
        </>
      )}
    </Container>
  );
};

export default AmountSpentPage;
