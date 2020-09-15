import React, { useState } from "react";
import { View, Text, Picker } from "react-native";
import { Container, H1 } from "native-base";
import globalStyles from "../../../styles/global";
import { PaymentMethods } from "../../../utils/enums";

const DeflectionsPage = () => {
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={[globalStyles.content]}>
        <View>
          <H1 style={globalStyles.title}>Desvíos entre presupuesto y real</H1>
        </View>
      </View>
    </Container>
  );
};

export default DeflectionsPage;
