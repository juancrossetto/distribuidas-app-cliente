import React, { useState, useEffect } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import globalStyles from "../../styles/global";
import { Container, H1, Fab, Spinner } from "native-base";
import useAlert from "../../hooks/useAlert";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import BankAccount from "../../components/BankAccount";
import { Ionicons } from "@expo/vector-icons";
import { getBankAccountsService } from "../../services/bankAccountService";

const BankAccountsPage = (props) => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const [bankAccountsList, setBankAccountsList] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getBankAccounts = async () => {
    setLoading(true);
    setBankAccountsList(await getBankAccountsService());
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      console.log("focus cuentas bancarias");
      getBankAccounts();
      return () => {};
    }
  }, [isFocused]);

  const handleAdd = () => {
    navigation.navigate("NewBankAccountPage");
  };
  return (
    <Container style={[globalStyles.container]}>
      {loading ? (
        <View>{/* <Spinner color="#000" /> */}</View>
      ) : (
        <View style={[globalStyles.content, { marginTop: 30 }]}>
          <H1 style={globalStyles.title}>Cuenta Bancaria</H1>
          <SafeAreaView style={{ flex: 5 }}>
            {bankAccountsList && bankAccountsList.length > 0 ? (
              <FlatList
                style={{ flex: 1 }}
                data={bankAccountsList}
                renderItem={({ item }) => <BankAccount item={item} />}
                keyExtractor={(inc) => inc.id}
              />
            ) : (
              <H1 style={globalStyles.subtitle}>
                No posees una cuenta asociada
              </H1>
            )}
          </SafeAreaView>
          <View style={{ flex: 1 }}>
            <Fab
              active={true}
              direction="up"
              style={{ backgroundColor: "#3700b3" }}
              position="bottomLeft"
              onPress={() => handleAdd()}
            >
              <Ionicons name="md-add" />
            </Fab>
          </View>
          <CustomAlert />
        </View>
      )}
    </Container>
  );
};

export default BankAccountsPage;
