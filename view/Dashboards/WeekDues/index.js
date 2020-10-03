import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Picker,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { Container, H1, Spinner } from "native-base";
import globalStyles from "../../../styles/global";
import { PaymentMethods } from "../../../utils/enums";
import BankAccountBalanceChart from "../../../components/Charts/BankAccountBalanceChart";
import useAlert from "../../../hooks/useAlert";
import {
  getCuotasPrestamoVencidasSemanaAsync,
  getInversionesVencidasSemanaAsync,
  getTarjetasCreditoVencidasSemanaAsync,
} from "../../../db";
import { formatDate, getEmailUserLogged } from "../../../utils";
import { useIsFocused } from "@react-navigation/native";
import { DataTable } from "react-native-paper";

const WeekDuesPage = () => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(true);
  // const [dues, setDues] = useState([]);
  const [investmentsDues, setInvestmentsDues] = useState(null);
  const [creditCardsDues, setCreditCardsDues] = useState(null);
  const [loansDues, setLoansDues] = useState(null);

  useEffect(() => {
    if (isFocused) {
      getDues();
    }
    return () => {};
  }, [isFocused]);

  const getDues = async () => {
    setLoading(true);
    const email = await getEmailUserLogged();
    await getInversionesVencidasSemanaAsync(setInvestmentsDues, email);
    await getTarjetasCreditoVencidasSemanaAsync(setCreditCardsDues, email);
    await getCuotasPrestamoVencidasSemanaAsync(setLoansDues, email);

    setCreditCardsDues();
    setLoading(false);
  };

  return (
    <Container style={[globalStyles.container]}>
      <SafeAreaView style={{ flex: 5 }}>
        <ScrollView>
          <View style={[globalStyles.content]}>
            <View style={{ marginTop: 20 }}>
              <H1 style={globalStyles.title}>Vencimientos de la Semana</H1>
            </View>
            {(creditCardsDues && creditCardsDues.length > 0) ||
            (investmentsDues && investmentsDues.length > 0) ||
            (loansDues && loansDues.length > 0) ? (
              <View style={{ padding: 0 }}>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Concepto</DataTable.Title>
                    <DataTable.Title numeric>Fecha Vencimiento</DataTable.Title>
                    <DataTable.Title numeric>Importe</DataTable.Title>
                  </DataTable.Header>
                  <FlatList
                    style={{ flex: 1 }}
                    data={investmentsDues}
                    renderItem={({ item }) => (
                      <DataTable.Row>
                        <DataTable.Cell>{item.type}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.dueDate}</DataTable.Cell>
                        <DataTable.Cell numeric>${item.amount}</DataTable.Cell>
                      </DataTable.Row>
                    )}
                    keyExtractor={(inc) => inc.id}
                  />
                  <FlatList
                    style={{ flex: 1 }}
                    data={creditCardsDues}
                    renderItem={({ item }) => (
                      <DataTable.Row>
                        <DataTable.Cell>
                          Tarjeta Cred. Cuota {item.numberFee}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>{item.dueDate}</DataTable.Cell>
                        <DataTable.Cell numeric>$ {item.amount}</DataTable.Cell>
                      </DataTable.Row>
                    )}
                    keyExtractor={(inc) => inc.id}
                  />
                  <FlatList
                    style={{ flex: 1 }}
                    data={loansDues}
                    renderItem={({ item }) => (
                      <DataTable.Row>
                        <DataTable.Cell>
                          Cuota {item.numberFee} de Préstamo
                        </DataTable.Cell>
                        <DataTable.Cell numeric>{item.dueDate}</DataTable.Cell>
                        <DataTable.Cell numeric>$ {item.amount}</DataTable.Cell>
                      </DataTable.Row>
                    )}
                    keyExtractor={(inc) => inc.id}
                  />
                </DataTable>
              </View>
            ) : (
              <H1 style={globalStyles.subtitle}>
                No existen vencimientos esta semana
              </H1>
            )}
            <CustomAlert />
            {loading && (
              <View>
                <Spinner color="#000" />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default WeekDuesPage;
