import React from 'react';
import {View} from 'react-native';
import {Container, H1} from 'native-base';
import globalStyles from '../../styles/global';

const BugdetsPage = () => {
  return (
    <Container style={[globalStyles.container, {backgroundColor: '#e84347'}]}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>Presupuestos</H1>
      </View>
    </Container>
  );
};

export default BugdetsPage;
