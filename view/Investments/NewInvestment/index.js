import React from "react";
import { Container, Tab, Tabs, ScrollableTab, H1, View } from "native-base";
import NewTimeDepositPage from "./NewTimeDeposit"; // Plazo Fijo
import globalStyles from "../../../styles/global";
import NewTitlePage from "./NewTitle";
import NewActionPage from "./NewAction";

const NewInvestmentPage = () => {
  return (
    <Container>
      <Tabs
        tabBarUnderlineStyle={{
          backgroundColor: "#3700B3",
        }}
        renderTabBar={() => <ScrollableTab />}
      >
        <Tab heading="Plazos Fijos">
          <NewTimeDepositPage />
        </Tab>
        <Tab heading="Titulos Valores">
          <NewTitlePage />
        </Tab>
        <Tab heading="Acciones">
          <NewActionPage />
        </Tab>
        <Tab heading="Fondos">
          <Container style={[globalStyles.container]}>
            <View style={globalStyles.content}>
              <H1 style={globalStyles.title}>Proximamente Fondos</H1>
            </View>
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default NewInvestmentPage;
