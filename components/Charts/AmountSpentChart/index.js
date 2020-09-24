import React from "react";
import { PieChart } from "react-native-svg-charts";
import { Text } from "react-native-svg";
import { getRandomColor } from "../../../utils";

const AmountSpentChart = ({ data }) => {
  const pieData = data
    .filter((exp) => exp.TotalAmount > 0)
    .map((exp, index) => ({
      value: exp.TotalAmount,
      paymentMethod: exp._id,
      svg: {
        fill: getRandomColor(),
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
          fontSize={12}
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
