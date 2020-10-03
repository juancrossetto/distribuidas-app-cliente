import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { H1 } from "native-base";
import globalStyles from "../../../styles/global";

const getBudgetAmountByType = (budgets, type) => {
  const budgetFiltered = budgets?.filter((b) => b.type === type);
  return budgetFiltered && budgetFiltered.length > 0
    ? budgetFiltered[0].amount
    : 0;
};

const getLoanAmountByType = (loans, type) => {
  const loanFiltered = loans?.filter((b) => b.type === type);
  return loanFiltered && loanFiltered.length > 0 ? loanFiltered[0].amount : 0;
};

const DeflectionChart = ({
  incomes,
  expenses,
  investments,
  budgets,
  loans,
}) => {
  const incomesAmount = incomes && incomes.length > 0 ? incomes[0].amount : 0;
  const expensesAmount =
    expenses && expenses.length > 0 ? expenses[0].amount : 0;
  const investmentAmount =
    investments && investments.length > 0 ? investments[0].amount : 0;
  const loansTakenAmount = getLoanAmountByType(loans, "TOM");
  const loansMadeAmount = getLoanAmountByType(loans, "REA");

  const incomeBudgeted = getBudgetAmountByType(budgets, "Ingreso");
  const expenseBudgeted = getBudgetAmountByType(budgets, "Egreso");
  const investmentBudgeted = getBudgetAmountByType(budgets, "Inversion");
  const loanTakenBudgeted = getBudgetAmountByType(budgets, "Prestamo Tomado");
  const loanMadeBudgeted = getBudgetAmountByType(budgets, "Prestamo Realizado");

  return (
    <ScrollView>
      {!(
        incomesAmount === 0 &&
        expensesAmount === 0 &&
        investmentAmount === 0 &&
        loansTakenAmount === 0 &&
        loansMadeAmount === 0 &&
        incomeBudgeted === 0 &&
        expenseBudgeted === 0 &&
        investmentBudgeted === 0 &&
        loanMadeBudgeted === 0 &&
        loanTakenBudgeted === 0
      ) ? (
        <View style={styles.container}>
          {incomesAmount > 0 ||
          expensesAmount > 0 ||
          incomeBudgeted > 0 ||
          expenseBudgeted > 0 ||
          investmentAmount > 0 ||
          investmentBudgeted > 0 ? (
            <View>
              <BarChart
                data={{
                  labels: [
                    "Pres. Ingr.",
                    "Ingresos",
                    "Pres. Egr.",
                    "Egresos",
                    "Pres. Inv.",
                    "Inv",
                  ],
                  datasets: [
                    {
                      data: [
                        incomeBudgeted,
                        incomesAmount,
                        expenseBudgeted,
                        expensesAmount,
                        investmentBudgeted,
                        investmentAmount,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 16}
                height={220}
                yAxisLabel={"$"}
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#8252c2",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(55, 0, 79, ${opacity})`,
                  style: {
                    borderRadius: 8,
                  },
                }}
                style={{
                  marginVertical: 0,
                  borderRadius: 8,
                  marginHorizontal: 0,
                }}
              />
            </View>
          ) : (
            <H1 style={globalStyles.subtitle}>
              No hay cargado presupuesto para Ingresos, Egresos e Inversiones en
              este período
            </H1>
          )}
          {loansTakenAmount > 0 ||
          loansMadeAmount > 0 ||
          loanTakenBudgeted > 0 ||
          loanMadeBudgeted > 0 ? (
            <View style={{ marginTop: 20 }}>
              <BarChart
                data={{
                  labels: [
                    "PP. Tomado",
                    "Prest. Tomado",
                    "PP. Realiz.",
                    "Prest. Realizado.",
                  ],
                  datasets: [
                    {
                      data: [
                        loanTakenBudgeted,
                        loansTakenAmount,
                        loanMadeBudgeted,
                        loansMadeAmount,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 16}
                height={260}
                yAxisLabel={"$"}
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#8252c2",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(55, 0, 79, ${opacity})`,
                  style: {
                    borderRadius: 8,
                  },
                }}
                style={{
                  marginVertical: 0,
                  borderRadius: 8,
                  marginHorizontal: 0,
                }}
              />
            </View>
          ) : (
            <H1 style={globalStyles.subtitle}>
              No hay cargado presupuesto para Inversiones y Prestamos en este
              período
            </H1>
          )}
        </View>
      ) : (
        <H1 style={globalStyles.subtitle}>
          No hay cargado información para este período
        </H1>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // padding: 8,
    // paddingTop: 30,
    // backgroundColor: "#ecf0f1",
  },
});

export default DeflectionChart;
