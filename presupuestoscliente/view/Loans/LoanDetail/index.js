import React, {useState, useEffect} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {Container, H1, Fab, Icon} from 'native-base';
import globalStyles from '../../../styles/global';
import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-community/async-storage';
import {getCurrentDate} from '../../../utils';
import useAlert from '../../../hooks/useAlert';
import Loan from '../../../components/Loan';

const LoansDetailPage = ({type}) => {
  const [CustomAlert, setMsg] = useAlert();
  const [loansList, setLoansList] = useState([]);

  useEffect(() => {
    setLoansList(
      [
        {
          amount: 10.0,
          loanType: 'REA',
          date: getCurrentDate(),
          id: 'BMUgTPyBr',
        },
        {
          amount: 1500,
          loanType: 'TOM',
          date: getCurrentDate(),
          id: 'BMUgTPyBr',
        },
      ] /*AsyncStorage.getItem('expenses')*/,
    );
  }, []);
  const navigation = useNavigation();

  const handleAdd = () => {
    // setIsActive(!isActive);
    navigation.navigate('NewLoanPage', {loans: loansList});
  };
  return (
    <Container style={[globalStyles.container, {backgroundColor: '#e84347'}]}>
      <View style={[globalStyles.content, {marginTop: 30, flex: 8}]}>
        <H1 style={globalStyles.title}>Prestamos {type}</H1>
        <ScrollView style={{flex: 1}}>
          {loansList.length <= 0 ? (
            <H1 style={globalStyles.subtitle}>No tenes prestamos {type}</H1>
          ) : (
            <FlatList
              style={{flex: 1}}
              data={loansList}
              renderItem={({item}) => <Loan item={item} />}
              keyExtractor={(exp) => exp.id}
            />
          )}
        </ScrollView>
        <CustomAlert />
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <Fab
          active={true}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#f4511e'}}
          position="bottomLeft"
          onPress={() => handleAdd()}>
          <Icon name="add-circle-outline" />
        </Fab>
      </View>
    </Container>
  );
};

export default LoansDetailPage;
