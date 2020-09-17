import React, { useState } from "react";
import { View, Text, Picker } from "react-native";
import { Container, H1 } from "native-base";
import globalStyles from "../../../styles/global";
import { Months, PaymentMethods } from "../../../utils/enums";
import DeflectionChart from "../../../components/Charts/DeflectionChart";

const DeflectionsPage = () => {
  // useEffect(() => {
  //   //Call API get presupuestos y egresos por mes
  //   if(month === "")
  // }, [month])
  const [month, setMonth] = useState(null);

  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={{ marginHorizontal: 5, flex: 2, marginTop: 30 }}>
        <H1 style={globalStyles.title}>Desvío de Presupuestos</H1>
        <View>
          <Picker
            style={{
              height: 50,
              backgroundColor: "#FFF",
              marginHorizontal: 10,
            }}
            selectedValue={month}
            onValueChange={(e) => setMonth(e)}
          >
            <Picker.Item label="-- Seleccione un Mes --" value="" />
            {Months.map((item, i) => (
              <Picker.Item label={item.text} value={item.text} key={i} />
            ))}
          </Picker>
        </View>
      </View>
      {month ? (
        <View style={[{ flex: 8 }]}>
          <DeflectionChart
            budgetedData={[14, 1, 100, 95, 94]}
            realData={[24, 28, 93, 77, 42]}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Presupuestado</Text>
              <View
                style={{
                  width: 15,
                  height: 10,
                  backgroundColor: "white",
                }}
              ></View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Real</Text>
              <View
                style={{
                  width: 15,
                  height: 10,
                  backgroundColor: "rgb(134, 65, 244)",
                }}
              ></View>
            </View>
          </View>
        </View>
      ) : null}
    </Container>
  );
};

export default DeflectionsPage;
