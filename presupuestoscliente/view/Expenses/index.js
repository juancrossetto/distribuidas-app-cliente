import React, {useState, useEffect} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {Container, H1, Toast} from 'native-base';
import globalStyles from '../../styles/global';
import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-community/async-storage';
import Expense from '../../components/Expense';
import {getCurrentDate} from '../../utils';
import AnimatedButton from '../../components/AnimatedButton';

const ExpensesPage = () => {
  const [message, setMessage] = useState(null);
  const [expensesList, setExpensesList] = useState([]);

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

  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  const handleAdd = () => {
    navigation.navigate('NewExpensePage', {expenses: expensesList});
  };
  return (
    <Container style={[globalStyles.container, {backgroundColor: '#e84347'}]}>
      <View style={[globalStyles.content, {marginTop: 30}]}>
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
        <AnimatedButton text="Agregar" onPress={handleAdd} />
        {message && showAlert()}
      </View>
    </Container>
  );
};

export default ExpensesPage;
