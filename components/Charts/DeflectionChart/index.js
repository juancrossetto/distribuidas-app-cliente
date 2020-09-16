import React, { useState } from "react";
import { BarChart, Grid } from "react-native-svg-charts";
import { Text } from "react-native-svg";

const DeflectionChart = ({ realData, budgetedData }) => {
  const budgeted = budgetedData.map((value) => ({
    value,
  }));
  const real = realData.map((value) => ({
    value,
  }));

  const barData = [
    {
      data: budgeted,
      svg: {
        fill: "rgb(134, 65, 244)",
      },
    },
    {
      data: real,
    },
  ];

  const CUT_OFF = 50;
  // const [data, setData] = useState([50, 10, 40, 95, 85]);

  const LabelsReal = ({ x, y, bandwidth, data }) =>
    data.map((value, index) => (
      <Text
        key={index}
        x={value > CUT_OFF ? x(0) + 10 : x(value) + 10}
        y={y(index) + bandwidth / 2}
        fontSize={14}
        fill={value > CUT_OFF ? "white" : "black"}
        alignmentBaseline={"middle"}
      >
        {value}
      </Text>
    ));
  return (
    <BarChart
      style={{ height: 200 }}
      data={barData}
      yAccessor={({ item }) => item.value}
      svg={{
        fill: "blue",
      }}
      contentInset={{ top: 30, bottom: 30 }}
      // horizontal={true}
      // {...props}
    >
      <Grid direction={Grid.Direction.VERTICAL} />
      {/* <LabelsReal data={data} /> */}
    </BarChart>
  );
};

export default DeflectionChart;
