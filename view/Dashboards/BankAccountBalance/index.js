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
import { useIsFocused } from "@react-navigation/native";
import {
  getBankAccountMovementsByDatesService,
  getBankAccountsService,
} from "../../../services/bankAccountService";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AnimatedButton from "../../../components/AnimatedButton";
import useAlert from "../../../hooks/useAlert";
import { formatDate } from "../../../utils";
import { DataTable } from "react-native-paper";
import { genericSelectAsync } from "../../../db";
import { BANKACCOUNTS } from "../../../utils/storage";

const BankAccountBalancePage = () => {
  const [bankAccountSelected, setBankAccountSelected] = useState("");
  const isFocused = useIsFocused();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(true);
  const [movements, setMovements] = useState([]);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [isFromDatePickerVisible, setIsFromDatePickerVisible] = useState(false);
  const [isToDatePickerVisible, setIsToDatePickerVisible] = useState(false);

  // const [page, setPage] = useState(0);
  // const itemsPerPage = 3;
  // const from = page * itemsPerPage;
  // const to = (page + 1) * itemsPerPage;

  useEffect(() => {
    setMovements([]);
    getBankAccounts();

    return () => {};
  }, [isFocused]);

  const getBankAccounts = async () => {
    // setBankAccounts(await getBankAccountsService());
    genericSelectAsync(setBankAccounts, BANKACCOUNTS);
    setLoading(false);
  };

  const confirmFromDate = (date) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    setFromDate(date.toLocaleDateString("es-ES", options));
    setIsFromDatePickerVisible(false);
  };

  const confirmToDate = (date) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    setToDate(date.toLocaleDateString("es-ES", options));
    setIsToDatePickerVisible(false);
  };

  const handleSearch = async () => {
    if (bankAccountSelected === "" || fromDate === null || toDate === null) {
      setMsg("Por favor complete todos los filtros");
      return;
    }

    if (toDate < fromDate) {
      setMsg("La fecha de Inicio no puede ser mayor a la de Fin");
      return;
    }

    setLoading(true);
    const resp = await getBankAccountMovementsByDatesService(
      bankAccountSelected,
      fromDate,
      toDate
    );
    if (resp.isSuccess) {
      if (resp.data.length === 0) {
        setMsg("No se encontraron movimientos para la fecha indicada");
      } else {
        setMovements(resp.data);
      }
    } else {
      setMsg(resp.data);
    }

    setLoading(false);
  };

  return (
    <Container style={[globalStyles.container]}>
      <SafeAreaView style={{ flex: 5 }}>
        <ScrollView>
          <View style={[globalStyles.content]}>
            <View style={{ marginTop: 20 }}>
              <H1 style={globalStyles.title}>Estado de Cuentas Bancarias</H1>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View>
                <Text style={globalStyles.buttonText}>Fecha de Inicio:</Text>
                <Button
                  title={!fromDate ? "Seleccionar Fecha de Inicio" : fromDate}
                  onPress={() => setIsFromDatePickerVisible(true)}
                  color={!fromDate ? "#2b6fa6" : "#4BB543"}
                />
                <DateTimePickerModal
                  isVisible={isFromDatePickerVisible}
                  mode="date"
                  onConfirm={confirmFromDate}
                  onCancel={() => setIsFromDatePickerVisible(false)}
                  locale="es_ES"
                  headerTextIOS="Elige la fecha de Inicio"
                  cancelTextIOS="Cancelar"
                  confirmTextIOS="Confirmar"
                />
              </View>
              <View style={{ marginTop: 0 }}>
                <Text style={globalStyles.buttonText}>Fecha de Fin:</Text>
                <Button
                  title={!toDate ? "Selecconar Fecha de Fin" : toDate}
                  onPress={() => setIsToDatePickerVisible(true)}
                  color={!toDate ? "#2b6fa6" : "#4BB543"}
                />
                <DateTimePickerModal
                  isVisible={isToDatePickerVisible}
                  mode="date"
                  onConfirm={confirmToDate}
                  onCancel={() => setIsToDatePickerVisible(false)}
                  locale="es_ES"
                  headerTextIOS="Elige la fecha de Vencimiento"
                  cancelTextIOS="Cancelar"
                  confirmTextIOS="Confirmar"
                />
              </View>
            </View>
            <View>
              <Picker
                style={{
                  height: 40,
                  marginTop: 22,
                  backgroundColor: "#FFF",
                }}
                selectedValue={bankAccountSelected}
                onValueChange={(val) => setBankAccountSelected(val)}
              >
                <Picker.Item
                  label={
                    bankAccounts && bankAccounts.length > 0
                      ? "-- Seleccione una Cuenta Bancaria --"
                      : "-- No posee cuentas Bancarias Registradas --"
                  }
                  value=""
                />
                {bankAccounts &&
                  bankAccounts.map((item, i) => (
                    <Picker.Item
                      label={`${item?.alias.toString()}  (${item?.cbu.toString()})`}
                      value={item?.id?.toString()}
                      key={i}
                    />
                  ))}
              </Picker>
            </View>
            <View>
              <AnimatedButton
                text="Buscar Movimientos"
                onPress={() => handleSearch()}
              />
            </View>
            {movements && movements.length > 0 ? (
              <View style={{ padding: 0 }}>
                <BankAccountBalanceChart movements={movements} />
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Fecha</DataTable.Title>
                    <DataTable.Title numeric>Concepto</DataTable.Title>
                    <DataTable.Title numeric>Importe</DataTable.Title>
                  </DataTable.Header>
                  <FlatList
                    style={{ flex: 1 }}
                    data={movements}
                    renderItem={({ item }) => (
                      <DataTable.Row>
                        <DataTable.Cell>{formatDate(item.date)}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.type}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
                      </DataTable.Row>
                    )}
                    keyExtractor={(inc) => inc.id}
                  />

                  {/* <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.floor(
                      (movements.length + 1) / itemsPerPage
                    )}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} de ${movements.length}`}
                  /> */}
                </DataTable>
              </View>
            ) : null}
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

export default BankAccountBalancePage;
