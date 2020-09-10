import React, {useState, useEffect} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {Container, H1} from 'native-base';
import globalStyles from '../../styles/global';
import Investment from '../../components/Investment';
import {getCurrentDate} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from '../../components/AnimatedButton';

const InvestmentsPage = () => {
  const [message, setMessage] = useState(null);
  const navigation = useNavigation();
  const [investmentsList, setInvestmentsList] = useState([]);

  useEffect(() => {
    setInvestmentsList([
      {
        investmentType: 'Plazo Fijo',
        bankAccount: '1234567891',
        days: 60,
        amount: 1000,
        interestRate: 18,
        date: getCurrentDate(),
        id: 'ZMUgTPyBp',
      },
    ]);
  }, []);

  const handleAdd = () => {
    navigation.navigate('NewInvestmentPage');
  };
  return (
    <Container style={[globalStyles.container, {backgroundColor: '#e84347'}]}>
      <View style={[globalStyles.content, {marginTop: 30}]}>
        <H1 style={globalStyles.title}>Inversiones</H1>
        <ScrollView style={{flex: 1}}>
          {investmentsList.length <= 0 ? (
            <H1 style={globalStyles.subtitle}>Aún no ha Invertido</H1>
          ) : (
            <FlatList
              style={{flex: 1}}
              data={investmentsList}
              renderItem={({item}) => <Investment item={item} />}
              keyExtractor={(inc) => inc.id}
            />
          )}
        </ScrollView>
        <AnimatedButton text="Agregar" onPress={handleAdd} />
        {message && showAlert()}
      </View>
    </Container>
  );
};

export default InvestmentsPage;
