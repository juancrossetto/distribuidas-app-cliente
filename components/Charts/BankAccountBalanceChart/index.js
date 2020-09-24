import React from "react";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { View } from "react-native";

const BankAccountBalanceChart = ({ movements }) => {
  let bankAccountBalance = movements.map((m) => {
    return m.bankAccountBalance;
  });
  if (movements?.length > 0)
    // Agregamos saldo inicial antes de los movimientos
    bankAccountBalance.unshift(
      movements[0].bankAccountBalance - movements[0].amount
    );
  console.log(movements[0].bankAccountBalance, movements[0].amount);
  console.log("bankAccountBalance", bankAccountBalance);
  const axesSvg = { fontSize: 10, fill: "#000" };
  const verticalContentInset = { top: 5, bottom: 5 };
  const xAxisHeight = 10;
  return (
    <View
      style={{ height: 200, width: "100%", padding: 4, flexDirection: "row" }}
    >
      <YAxis
        data={bankAccountBalance}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        svg={axesSvg}
        style={{ width: 30 }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ flex: 1 }}
          data={bankAccountBalance}
          contentInset={verticalContentInset}
          svg={{ stroke: "rgb(134, 65, 244)" }}
        >
          <Grid />
        </LineChart>
        <XAxis
          style={{ marginHorizontal: -10, height: xAxisHeight }}
          data={bankAccountBalance}
          formatLabel={(value, index) => index}
          contentInset={{ left: 10, right: 10 }}
          svg={axesSvg}
        />
      </View>
    </View>
  );
};

export default BankAccountBalanceChart;
