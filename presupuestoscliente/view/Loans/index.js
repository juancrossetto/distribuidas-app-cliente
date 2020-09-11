import React from 'react';
import {Container, Tab, Tabs, ScrollableTab, H1, View} from 'native-base';
import globalStyles from '../../styles/global';
import LoansDetailPage from './LoanDetail';

const LoansPage = () => {
  return (
    <Container>
      <Tabs
        tabBarUnderlineStyle={{
          backgroundColor: '#f4511e',
        }}
        renderTabBar={() => <ScrollableTab />}>
        <Tab heading="Realizados">
          <LoansDetailPage type={'Realizados'} />
        </Tab>
        <Tab heading="Tomados">
          <LoansDetailPage type={'Tomados'} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default LoansPage;
