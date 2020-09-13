import React from 'react';
import {Container, Tab, Tabs, ScrollableTab, H1, View} from 'native-base';
import NewTimeDepositPage from './NewTimeDeposit'; // Plazo Fijo
import globalStyles from '../../../styles/global';

const NewInvestmentPage = () => {
  return (
    <Container>
      {/* <Header hasTabs style={{backgroundColor: 'f4511e'}} /> */}
      <Tabs
        tabBarUnderlineStyle={{
          backgroundColor: '#f4511e',
        }}
        renderTabBar={() => <ScrollableTab />}>
        <Tab heading="Plazos Fijos">
          <NewTimeDepositPage />
        </Tab>
        <Tab heading="Titulos Valores">
          <Container
            style={([globalStyles.container], {backgroundColor: '#E84347'})}>
            <View style={globalStyles.content}>
              <H1 style={globalStyles.title}>Proximamente Titulos Valores</H1>
            </View>
          </Container>
        </Tab>
        <Tab heading="Acciones">
          <Container
            style={([globalStyles.container], {backgroundColor: '#E84347'})}>
            <View style={globalStyles.content}>
              <H1 style={globalStyles.title}>Proximamente Acciones</H1>
            </View>
          </Container>
        </Tab>
        <Tab heading="Fondos">
          <Container
            style={([globalStyles.container], {backgroundColor: '#E84347'})}>
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
