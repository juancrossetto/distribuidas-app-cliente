import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, SafeAreaView } from "react-native";
import globalStyles from "../../styles/global";
import { Container, H1, Fab, Spinner } from "native-base";
import useAlert from "../../hooks/useAlert";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import BankAccount from "../../components/BankAccount";
import { Ionicons } from "@expo/vector-icons";
import { saveItem, getItem, BANKACCOUNTS } from "../../utils/storage";

const BankAccountsPage = (props) => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const [bankAccountsList, setBankAccountsList] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getBankAccounts = async () => {
    try {
      //llamamos API, si devuelve OK, pisamos storage, sino usamos el storage.
      // saveItem(BANKACCOUNTS, res);
      // setBankAccountsList(res);
      throw ex;
    } catch (error) {
      setBankAccountsList(await getItem(BANKACCOUNTS));
    }
  };

  useEffect(() => {
    setLoading(true);
    getBankAccounts();
    setLoading(false);
    return () => {};
  }, [props, isFocused]);

  const handleAdd = () => {
    navigation.navigate("NewBankAccountPage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      {loading ? (
        <View>
          <Spinner color="white" />
        </View>
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
              style={{ backgroundColor: "#f4511e" }}
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
