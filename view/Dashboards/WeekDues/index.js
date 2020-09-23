import React, { useState } from "react";
import { View, Text, Picker } from "react-native";
import { Container, H1 } from "native-base";
import globalStyles from "../../../styles/global";
import { PaymentMethods } from "../../../utils/enums";
import BankAccountBalanceChart from "../../../components/Charts/BankAccountBalanceChart";

const WeekDuesPage = () => {
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#6200EE" }]}>
      <View style={[globalStyles.content]}>
        <View>
          <H1 style={globalStyles.title}>Vencimientos de la Semana</H1>
        </View>
      </View>
    </Container>
  );
};

export default WeekDuesPage;
