import React, { useEffect } from "react";
import { View } from "react-native";
import { Container, Spinner } from "native-base";
import globalStyles from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import { clearAll, USERLOGGED } from "../../utils/storage";
import { dropTablesAsync } from "../../db";

const CloseSessionPage = () => {
  // State del formulario
  // React Navigation
  const navigation = useNavigation();

  const clearInfo = async () => {
    await clearAll();
    await dropTablesAsync("bankaccountmovements");
    await dropTablesAsync("creditcardmovements");
    await dropTablesAsync("bankaccounts");
    await dropTablesAsync("budgets");
    await dropTablesAsync("creditcards");
    await dropTablesAsync("expenses");
    await dropTablesAsync("incomes");
    await dropTablesAsync("investments");
    await dropTablesAsync("loanmovements");
    await dropTablesAsync("loans");

    // setTimeout(() => {
    navigation.navigate("Login");
    // }, 500);
  };

  useEffect(() => {
    clearInfo();
  }, []);

  return (
    <Container style={[globalStyles.container]}>
      <View style={globalStyles.content}>
        <View>
          <Spinner color="#000" />
        </View>
      </View>
    </Container>
  );
};

export default CloseSessionPage;
