import React, { useState } from "react";
import { View } from "react-native";
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

  // const CUT_OFF = 50;
  // const [data, setData] = useState([50, 10, 40, 95, 85]);
  const data = [10, 5, 25, 15, 20];
  const CUT_OFF = 20;
  const Labels = ({ x, y, bandwidth, data }) =>
    data.map((value, index) => (
      <Text
        key={index}
        x={x(index) + bandwidth / 2}
        y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
        fontSize={14}
        fill={value >= CUT_OFF ? "white" : "black"}
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
      >
        {value}
      </Text>
    ));
  return (
    <View style={{ flexDirection: "row", height: 200, paddingVertical: 16 }}>
      <BarChart
        style={{ flex: 1 }}
        data={barData}
        yAccessor={({ item }) => item.value}
        svg={{ fill: "white" }}
        contentInset={{ top: 10, bottom: 10 }}
        spacing={0.2}
        gridMin={0}
      >
        <Grid direction={Grid.Direction.HORIZONTAL} />
        {/* <Labels /> */}
      </BarChart>
    </View>
    // <>
    //   <BarChart
    //     style={{ height: 200 }}
    //     data={barData}
    //     yAccessor={({ item }) => item.value}
    //     svg={{
    //       fill: "blue",
    //     }}
    //     contentInset={{ top: 30, bottom: 30 }}
    //     // horizontal={true}
    //     // {...props}
    //   >
    //     <Grid direction={Grid.Direction.VERTICAL} />
    //     <LabelsReal />
    //     {/* <Text>asdasd</Text> */}
    //   </BarChart>
    // </>
  );
};

export default DeflectionChart;
