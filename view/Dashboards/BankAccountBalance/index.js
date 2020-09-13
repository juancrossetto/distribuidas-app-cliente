import React, { useState } from "react";
import { View, Text, Picker } from "react-native";
import { Container, H1 } from "native-base";
import globalStyles from "../../../styles/global";
import { PaymentMethods } from "../../../utils/enums";
import BankAccountBalanceChart from "../../../components/Charts/BankAccountBalanceChart";
const BankAccountBalancePage = () => {
  const [bankAccountSelected, setBankAccountSelected] = useState(null);

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
              label="-- Seleccione una Cuenta Bancaria --"
              value=""
            />
            <Picker.Item
              label="1234567891"
              value={[100, 10, 40, -24, 250, 100, 350, 0, 43]}
            />
            <Picker.Item label="3456789011" value={[200, 10, 150, -10]} />
            <Picker.Item
              label="2414205416"
              value={[10, 40, 30, -20, 50, 200]}
            />
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
