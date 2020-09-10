import React from 'react';
import {View} from 'react-native';
import {Container, H1} from 'native-base';
import globalStyles from '../../styles/global';

const BankAccountsPage = () => {
  return (
    <Container style={[globalStyles.container, {backgroundColor: '#e84347'}]}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>Cuenta Bancaria</H1>
      </View>
    </Container>
  );
};

export default BankAccountsPage;
