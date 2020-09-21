import React, { useState, useEffect } from "react";
import { View, Text, Picker } from "react-native";
import { Container, H1 } from "native-base";
import globalStyles from "../../../styles/global";
import { PaymentMethods } from "../../../utils/enums";
import BankAccountBalanceChart from "../../../components/Charts/BankAccountBalanceChart";
import { useIsFocused } from "@react-navigation/native";
import { getBankAccountsService } from "../../../services/bankAccountService";

const BankAccountBalancePage = () => {
  const [bankAccountSelected, setBankAccountSelected] = useState(null);
  const isFocused = useIsFocused();
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    getBankAccounts();

    return () => {};
  }, [isFocused]);

  const getBankAccounts = async () => {
    setBankAccounts(await getBankAccountsService());
  };

  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={[globalStyles.content]}>
        <View>
          <H1 style={globalStyles.title}>Estado de Cuentas Bancarias</H1>
        </View>
        <View>
          <Picker
            style={{
              height: 50,
              marginTop: 22,
              backgroundColor: "#FFF",
            }}
            selectedValue={bankAccountSelected}
            onValueChange={(val) => setBankAccountSelected(val)}
          >
            <Picker.Item
              label={
                bankAccounts?.length > 0
                  ? "-- Seleccione una Cuenta Bancaria --"
                  : "-- No posee cuentas Bancarias Registradas --"
              }
              value=""
            />
            {bankAccounts?.map((item, i) => (
              <Picker.Item
                label={`${item?.alias.toString()}  (${item?.cbu.toString()})`}
                value={[100, 10, 40, -24, 250, 100, 350, 0, 43]}
                key={i}
              />
            ))}
          </Picker>
        </View>
        {bankAccountSelected ? (
          <View>
            <BankAccountBalanceChart movements={bankAccountSelected} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text>Saldo al 15/05/2020: $ {bankAccountSelected[0]}</Text>
              <Text>
                Saldo al 15/05/2021: ${" "}
                {bankAccountSelected[bankAccountSelected.length - 1]}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </Container>
  );
};

export default BankAccountBalancePage;
