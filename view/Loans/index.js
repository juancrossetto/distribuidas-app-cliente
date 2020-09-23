import React from "react";
import { Container, Tab, Tabs, ScrollableTab, H1, View } from "native-base";
import globalStyles from "../../styles/global";
import LoansDetailPage from "./LoanDetail";

const LoansPage = () => {
  return (
    <Container>
      <Tabs
        tabBarUnderlineStyle={{
          backgroundColor: "#BB86FC",
        }}
        renderTabBar={() => <ScrollableTab />}
      >
        <Tab heading="Realizados">
          <LoansDetailPage type={"REA"} />
        </Tab>
        <Tab heading="Tomados">
          <LoansDetailPage type={"TOM"} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default LoansPage;
