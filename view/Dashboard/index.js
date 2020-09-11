import React from 'react';
import {View} from 'react-native';
import {Container, H1} from 'native-base';
import globalStyles from '../../styles/global';
import StackedBarChartExample from '../../components/BarChart';
const DashboardPage = () => {
  return (
    <Container style={[globalStyles.container, {backgroundColor: '#e84347'}]}>
      <View style={globalStyles.content}>
        {/* <H1 style={globalStyles.title}>Graficos</H1> */}
        <StackedBarChartExample />
      </View>
    </Container>
  );
};

export default DashboardPage;
