import React, {useState, useEffect} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {Container, H1, Fab, Icon} from 'native-base';
import globalStyles from '../../styles/global';
import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-community/async-storage';
import Expense from '../../components/Expense';
import {getCurrentDate} from '../../utils';
import AnimatedButton from '../../components/AnimatedButton';
import useAlert from '../../hooks/useAlert';

const ExpensesPage = () => {
  const [CustomAlert, setMsg] = useAlert();
  const [expensesList, setExpensesList] = useState([]);

  // const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setExpensesList(
      [
        {
          amount: 10.0,
          paymentType: 'TAR',
          expenseType: 'PER',
          detail: '',
          category: '5',
          date: getCurrentDate(),
          id: 'BMUgTPyBp',
        },
        {
          amount: 1500,
          paymentType: 'TAR',
          expenseType: 'PER',
          detail: '',
          category: '5',
          date: getCurrentDate(),
          id: 'BMUgTPyBr',
        },
        {
          amount: 10.05,
          paymentType: 'TAR',
          expenseType: 'PER',
          detail: '',
          category: '5',
          date: getCurrentDate(),
          id: 'BMUgTPyBn',
        },
        {
          amount: 400,
          paymentType: 'TAR',
          expenseType: 'PER',
          detail: '',
          category: '5',
          date: getCurrentDate(),
          id: 'BMUgTPyBs',
        },
        {
          amount: 10.0,
          paymentType: 'TAR',
          expenseType: 'PER',
          detail: '',
          category: '5',
          date: getCurrentDate(),
          id: 'BMUgTPyBm',
        },
        {
          amount: 1500,
          paymentType: 'TAR',
          expenseType: 'PER',
          detail: '',
          category: '5',
          date: getCurrentDate(),
          id: 'BMUgTPyBj',
        },
      ] /*AsyncStorage.getItem('expenses')*/,
    );
  }, []);
  const navigation = useNavigation();

  const handleAdd = () => {
    // setIsActive(!isActive);
    navigation.navigate('NewExpensePage', {expenses: expensesList});
  };
  return (
    <Container style={[globalStyles.container, {backgroundColor: '#e84347'}]}>
      <View style={[globalStyles.content, {marginTop: 30, flex: 8}]}>
        <H1 style={globalStyles.title}>Egresos</H1>
        <ScrollView style={{flex: 1}}>
          {expensesList.length <= 0 ? (
            <H1 style={globalStyles.subtitle}>No tenes egresos cargados</H1>
          ) : (
            <FlatList
              style={{flex: 1}}
              data={expensesList}
              renderItem={({item}) => <Expense item={item} />}
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

export default ExpensesPage;
