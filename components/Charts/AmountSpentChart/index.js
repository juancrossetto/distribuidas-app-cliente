import React from "react";
import { PieChart } from "react-native-svg-charts";

import { Text } from "react-native-svg";
const AmountSpentChart = ({ data }) => {
  const pieData = data
    .filter((exp) => exp.amount > 0)
    .map((exp, index) => ({
      value: exp.amount,
      paymentMethod: exp.paymentMethod,
      svg: {
        fill: exp.color,
        onPress: () => console.log("press", index),
      },
      key: `pie-${index}`,
    }));
  const Labels = ({ slices, height, width, data }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, value } = slice;

      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={"white"}
          // textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={9}
          stroke={"black"}
          strokeWidth={0}
        >
          ${value}
        </Text>
      );
    });
  };
  return (
    <PieChart
      style={{ height: 400 }}
      data={pieData}
      spacing={0}
      key={0}
      valueAccessor={({ item }) => item.value}
      // outerRadius={"150%"}
    >
      <Labels data={pieData} />
    </PieChart>
  );
};

export default AmountSpentChart;
