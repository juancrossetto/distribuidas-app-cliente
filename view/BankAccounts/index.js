import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList } from "react-native";
import globalStyles from "../../styles/global";
import { Container, H1, Fab } from "native-base";
import useAlert from "../../hooks/useAlert";
import { useNavigation } from "@react-navigation/native";
import { getCurrentDate } from "../../utils";
import BankAccount from "../../components/BankAccount";
import { Ionicons } from "@expo/vector-icons";

const BankAccountsPage = () => {
  const [CustomAlert, setMsg] = useAlert();
  const navigation = useNavigation();
  const [bankAccountsList, setBankAccountsList] = useState([]);
  const [active, setActive] = useState(false);
  useEffect(() => {
    setBankAccountsList([
      {
        cbu: "01700992 20000067797370",
        balance: 15000,
        entity: "Santander",
        card: "4111 1111 1111 1111",
        alias: "Mi cuenta en pesos",
        date: getCurrentDate(),
        id: "ZMUgTPyBp1",
      },
    ]);
  }, []);

  const handleAdd = () => {
    navigation.navigate("NewBankAccountPage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={[globalStyles.content, { marginTop: 30 }]}>
        <H1 style={globalStyles.title}>Cuenta Bancaria</H1>
        <ScrollView style={{ flex: 1 }}>
          {bankAccountsList.length <= 0 ? (
            <H1 style={globalStyles.subtitle}>No posees una cuenta asociada</H1>
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={bankAccountsList}
              renderItem={({ item }) => <BankAccount item={item} />}
              keyExtractor={(inc) => inc.id}
            />
          )}
        </ScrollView>
        <View style={{ flex: 1 }}>
          <Fab
            active={true}
            direction="up"
            style={{ backgroundColor: "#f4511e" }}
            position="bottomLeft"
            onPress={() => handleAdd()}
          >
            <Ionicons name="md-add" />
          </Fab>
        </View>
        <CustomAlert />
      </View>
    </Container>
  );
};

export default BankAccountsPage;
